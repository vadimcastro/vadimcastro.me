// src/components/layout/footer.tsx
export default function Footer() {
    return (
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Vadim Castro. All rights reserved.
            </div>
            <div className="space-x-6">
              <a href="https://github.com/yourusername" className="text-gray-600 hover:text-gray-900">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-gray-600 hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }