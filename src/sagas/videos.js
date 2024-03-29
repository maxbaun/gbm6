import { takeEvery, all, put, select, call } from "redux-saga/effects";

import { getVideos } from "../services/api";
import {
  types as videoTypes,
  selectors as videoSelectors
} from "../ducks/videos";
import { types as stateTypes } from "../ducks/state";
import { types as cacheTypes } from "../ducks/cache";
import { shouldCache } from "../constants";
import { fromJS } from "immutable";

export function* watchVideos() {
  yield takeEvery(videoTypes.VIDEOS_GET, onVideosGet);
  yield takeEvery(videoTypes.VIDEOS_INIT, onVideosInit);
  yield takeEvery(videoTypes.VIDEOS_UPDATE, onVideosUpdate);
}

function* onVideosInit({ payload = {} }) {
  const perPage = 100;

  const query = {
    limit: perPage,
    skip: payload.skip || 0
  };

  const res = yield call(getVideos, { query });

  // If there are more videos, get the next set of videos
  if (res.skip + res.limit < res.total) {
    yield all([
      put({
        type: videoTypes.VIDEOS_INIT,
        payload: {
          skip: payload.skip || 0 + perPage
        }
      })
    ]);
  }

  return yield all([
    put({
      type: videoTypes.VIDEOS_UPDATE,
      payload: res.items
    })
  ]);
}

function* onVideosGet({ payload, fetch }) {
  const query = {};

  if (payload.slug) {
    const video = yield select(videoSelectors.getVideo, payload.slug);

    if (video && shouldCache) {
      return;
    }

    query["fields.slug"] = payload.slug;
  }

  yield all([
    put({
      type: stateTypes.STATUS_CHANGE,
      fetch,
      payload: {
        loading: true,
        error: null
      }
    })
  ]);

  const res = yield call(getVideos, { query });

  return yield all([
    put({
      type: videoTypes.VIDEOS_UPDATE,
      payload: res.items
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

function* onVideosUpdate({ payload }) {
  return yield all([
    put({
      type: stateTypes.VIDEO_MODAL_ADD,
      payload: payload.map((i) => i.fields.video)
    }),
    put({
      type: stateTypes.LIGHTBOX_ADD,
      payload: fromJS(payload)
    }),
    put({
      type: cacheTypes.CACHE_VIDEOS_SET
    })
  ]);
}
