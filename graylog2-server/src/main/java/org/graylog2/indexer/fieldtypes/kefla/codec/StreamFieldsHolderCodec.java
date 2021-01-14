package org.graylog2.indexer.fieldtypes.kefla.codec;

import org.bson.BsonReader;
import org.bson.BsonWriter;
import org.bson.Document;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.DocumentCodec;
import org.bson.codecs.EncoderContext;

import java.util.List;

/**
 * Created by jehuty0shift on 07/10/19.
 */
public class StreamFieldsHolderCodec implements Codec<StreamFieldsHolder> {

    private final Codec<Document> documentCodec;

    public StreamFieldsHolderCodec() {
        this.documentCodec = new DocumentCodec();
    }

    @Override
    public void encode(BsonWriter writer, StreamFieldsHolder sfHolder, EncoderContext ec) {
        Document document = new Document();

        document.put("stream_id", sfHolder.streamId);
        document.put("fields", sfHolder.fields);

        documentCodec.encode(writer, document, ec);
    }

    @Override
    public StreamFieldsHolder decode(BsonReader reader, DecoderContext dc) {
        Document document = documentCodec.decode(reader, dc);

        return fromDocument(document);
    }


    public static StreamFieldsHolder fromDocument(Document document) {
        final String streamId = document.getString("stream_id");
        final List<String> fields = document.get("fields", List.class);

        return new StreamFieldsHolder(streamId, fields);
    }

    @Override
    public Class<StreamFieldsHolder> getEncoderClass() { return StreamFieldsHolder.class;}
}
