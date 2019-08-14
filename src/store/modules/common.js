const state = {
  articleMenuSource: []
}

const mutations = {}

const actions = {
  setArticleMenuSource (store, articleMenuSource) {
    store.state.articleMenuSource = articleMenuSource
    console.log(store.state.articleMenuSource)
  }
}

export default {
  state,
  mutations,
  actions
}
