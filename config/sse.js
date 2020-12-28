'use strict'

const Env = use('Env')

module.exports = {
  /*!
   |--------------------------------------------------
   | No IDs
   |--------------------------------------------------
   |
   | Whether id: field should be included
   | for the text-stream response
   |
   | flag to determine if server-sent events should
   | contain the 'id: xxxx' line
   |
   */
  no_ids: false,

  /*!
   |--------------------------------------------------
   | Compress Output
   |--------------------------------------------------
   |
   | Whether the text-stream response should compressed
   | using HTTP compression
   |
   | compress text output for server-sent events
   | HTTP entity body / payload
   |
   */
  compress_output: false,

  /*!
   |--------------------------------------------------
   | Prefer Event Name
   |--------------------------------------------------
   |
   | Whether the event: field should be included
   | for the text-stream response
   |
   | flag to determine if the `prefered_event_name`
   | should be in server-sent events
   | HTTP entity body / payload
   |
   */
  prefer_event_name: false,

  /*!
   |--------------------------------------------------
   | Prefered Event Name
   |--------------------------------------------------
   |
   | default event name: 'braodcast'
   |
   |
   */
  prefered_event_name: Env.get('SSE_PREFERED_EVENT_NAME', 'broadcast')

}
