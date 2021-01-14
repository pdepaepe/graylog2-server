package org.graylog2.indexer.fieldtypes.kefla.codec;

import java.util.List;

/**
 * Created by jehuty0shift on 07/10/19.
 */
public class StreamFieldsHolder {

    final public String streamId;
    final public List<String> fields;

    public StreamFieldsHolder(final String streamId, final List<String> fields) {
        this.streamId = streamId;
        this.fields = fields;
    }

}
