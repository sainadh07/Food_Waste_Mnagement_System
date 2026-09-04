from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT = Path(__file__).resolve().parent

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def do_GET(self):
        path = self.translate_path(self.path)
        requested = Path(path)

        if requested.is_file():
            return super().do_GET()

        app_routes = {'/', '/about', '/how-it-works', '/impact', '/contact', '/login', '/register', '/ngo/dashboard', '/admin/dashboard'}
        app_routes.update({f'/donor/{route}' for route in ('dashboard', 'create-donation', 'create-donation/preview', 'donations', 'requests', 'active', 'history', 'notifications', 'impact', 'profile', 'settings', 'report-issue')})
        app_routes.update({f'/ngo/{route}' for route in ('dashboard', 'nearby', 'requests', 'collections', 'distribution', 'completed', 'notifications', 'impact', 'profile', 'settings', 'report-issue')})
        if self.path not in app_routes:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'File not found')
            return

        index_path = ROOT / 'index.html'
        if index_path.exists():
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            with index_path.open('rb') as f:
                self.wfile.write(f.read())
            return

        return super().do_GET()

if __name__ == '__main__':
    port = 8000
    httpd = ThreadingHTTPServer(('0.0.0.0', port), Handler)
    print(f'Serving FoodShare on http://localhost:{port}')
    httpd.serve_forever()
