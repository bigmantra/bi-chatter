module.exports={

  findTopics:{
    description: 'Find one or more Topics and associated comments. If comments are not required, they can be switched off by passing populate=false as a query parameter',
    returns: 'an array of topics with an HTTP 200 OK response',
    usage: '/api/topics?sort=id DESC&skip=0&limit=10&where={"text":{"contains":"mme"}}'
  }


}


