"use strict";

/*
Rewrite the User-Agent header to say "Linux" instead of "Windows".
*/
function rewriteUserAgentHeader(e) {
  for (var header of e.requestHeaders) {
    if (header.name.toLowerCase() === "user-agent") {
      // tell itau that we are on FreeBSD, not on Windows
      header.value = header.value.replace("Windows NT","FreeBSD OS").replace("Linux","FreeBSD OS");
    }
  }
  return {requestHeaders: e.requestHeaders};
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,
                                          {urls: ["https://*.itau.com.br/*"]},
                                          ["blocking", "requestHeaders"]);

