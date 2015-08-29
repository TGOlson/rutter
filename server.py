import BaseHTTPServer
import re

class Handler( BaseHTTPServer.BaseHTTPRequestHandler ):
    def do_GET( self ):
        if (re.search(r'.js', self.path)):
            self.send_response(200)
            self.send_header( 'Content-type', 'application/javascript' )
            self.end_headers()
            self.wfile.write( open(self.path[1:]).read() )
        else:
            self.send_response(200)
            self.send_header( 'Content-type', 'text/html' )
            self.end_headers()
            self.wfile.write( open('index.html').read() )

httpd = BaseHTTPServer.HTTPServer( ('127.0.0.1', 8080), Handler )
httpd.serve_forever()
