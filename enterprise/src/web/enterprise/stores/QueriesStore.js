import Reflux from 'reflux';
import ObjectID from 'bson-objectid';

import QueriesActions from 'enterprise/actions/QueriesActions';
import fetch from 'logic/rest/FetchProvider';
import URLUtils from 'util/URLUtils';
import ObjectUtils from 'util/ObjectUtils';

const createSearchUrl = URLUtils.qualifyUrl('/plugins/org.graylog.plugins.enterprise/search');
const createSearchJobUrl = id => URLUtils.qualifyUrl(`/plugins/org.graylog.plugins.enterprise/search/${id}/execute`);
const jobStatusUrl = jobId => URLUtils.qualifyUrl(`/plugins/org.graylog.plugins.enterprise/search/status/${jobId}`);

export default Reflux.createStore({
  listenables: [QueriesActions],
  queries: {},
  getInitialState() {
    return this.queries;
  },
  create(query) {
    this.queries = {};
    const id = ObjectID();
    this.queries[id] =  { query: Object.assign(query, { id }) };
    const promise = fetch('POST', createSearchUrl, this.queries[id].query)
      .then(response => fetch('POST', createSearchJobUrl(response.id)))
      .then(executionResponse => fetch('GET', jobStatusUrl(executionResponse.job_id)))
      .then((result) => {
        const searchResult = ObjectUtils.clone(result);
        searchResult.results.messages.fields = ['source', 'message'];
        searchResult.results.messages.used_indices = [];
        searchResult.results.messages.built_query = '"*"';
        this.queries[id] = searchResult;
        this._trigger();
      });
    QueriesActions.create.promise(promise);
  },
  remove(id) {
    delete this.queries[id];
    this._trigger();
  },
  _trigger() {
    this.trigger(this.queries);
  },
});
