package org.graylog2.indexer.fieldtypes.kefla;

import com.google.common.collect.ImmutableSet;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.graylog.events.notifications.EventBacklogService;
import org.graylog2.database.MongoConnection;
import org.graylog2.indexer.IndexSet;
import org.graylog2.indexer.fieldtypes.FieldTypeDTO;
import org.graylog2.indexer.fieldtypes.kefla.codec.KeflaCodecProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

import static com.google.common.base.Preconditions.checkNotNull;

public class KeflaService {

    private static final String KEFLA_MASTER_MAPPINGS = "kefla_master_mappings";
    private static final Logger LOG = LoggerFactory.getLogger(KeflaService.class);
    private final MongoCollection<KIndexMapping> kIMCollection;

    @Inject
    public KeflaService(MongoConnection mongoConnection) {

        CodecRegistry cRegistry = CodecRegistries.fromRegistries(CodecRegistries.fromProviders(new KeflaCodecProvider()), MongoClient.getDefaultCodecRegistry());
        kIMCollection = checkNotNull(mongoConnection).getMongoDatabase()
                .getCollection(KEFLA_MASTER_MAPPINGS)
                .withWriteConcern(WriteConcern.JOURNALED)
                .withDocumentClass(KIndexMapping.class)
                .withCodecRegistry(cRegistry);

    }

    public Stream<FieldTypeDTO> filterField(final String indexName, final Collection<String> streamIds, ImmutableSet<FieldTypeDTO> indexSetFields) {

        List<KIndexMapping> kIMList = new ArrayList<>();
        LOG.debug("trying to find fields for index {} and streamIds {}", indexName,
                streamIds.stream().reduce((s, s2) -> s2 + " " + s).get());
        kIMCollection.find(Filters.and(Filters.eq("index", indexName),
                Filters.in("stream_fields.stream_id", streamIds))).into(kIMList);

        LOG.debug("will use the following kIMList {}", kIMList.isEmpty() ? "empty List" : kIMList.stream().map(KIndexMapping::toString).reduce((s, s2) -> s + " /" + s2 + "/").get());
        return indexSetFields.stream().filter(fieldTypeDTO -> {
            for (KIndexMapping kIM : kIMList) {
                if (kIM.containsField(streamIds, fieldTypeDTO.fieldName())) {
                    LOG.trace("field {} allowed for index {}", fieldTypeDTO.fieldName(), indexName);
                    return true;
                }
            }
            return false;
        });

    }

}
