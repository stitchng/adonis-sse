'use strict'

// const Env = use('Env')

module.exports = {

  no_ids: false, // server-sent events should contain the 'id: xxxx' line

  compress_output: false, // compress text output for server-sent events HTTP entity body / payload

  prefer_event_name: false, // 

  prefered_event_name: 'broadcast'

}
