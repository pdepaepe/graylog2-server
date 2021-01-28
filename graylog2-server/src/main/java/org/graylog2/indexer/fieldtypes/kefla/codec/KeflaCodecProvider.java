package org.graylog2.indexer.fieldtypes.kefla.codec;

import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.graylog2.indexer.fieldtypes.kefla.KIndexMapping;

/**
 * Created by jehuty0shift on 18/09/19.
 */
public class KeflaCodecProvider implements CodecProvider {

    public KeflaCodecProvider(){}

    @Override
    public <T> Codec<T> get(Class<T> type, CodecRegistry cr) {
        if( type == KIndexMapping.class) {
            return (Codec<T>) new KIndexMappingCodec();
        }
        if (type == StreamFieldsHolder.class) {
            return (Codec<T>) new StreamFieldsHolderCodec();
        }
        return null;
    }
}
