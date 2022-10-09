import { takeEvery, all, put, call } from "redux-saga/effects";

import { search } from "../services/api";
import { types as searchTypes } from "../ducks/search";
import { types as stateTypes } from "../ducks/state";

export function* watchSearch() {
  yield takeEvery(searchTypes.SEARCH_GET, onSearchGet);
}

function* onSearchGet({ payload, fetch }) {
  const searchTerms = payload.search.split(" ").join(",");
  const query = {
    title: {
      "fields.title[match]": searchTerms
    },
    description: {
      "fields.description[match]": searchTerms
    },
    location: {
      "fields.location[match]": searchTerms
    },
    text: {
      "fields.text[match]": searchTerms
    }
  };

  console.log(query);

  yield all([
    put({
      type: searchTypes.SEARCH_RESET
    }),
    put({
      type: stateTypes.STATUS_CHANGE,
      fetch,
      payload: {
        loading: true,
        error: null
      }
    })
  ]);

  const res = yield call(search, { query });

  return yield all([
    put({
      type: searchTypes.SEARCH_SET,
      payload: res
    }),
    put({
      type: stateTypes.STATUS_CHANGE,
      fetch,
      payload: {
        loading: false,
        error: null
      }
    })
  ]);
}
