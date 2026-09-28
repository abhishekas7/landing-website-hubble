
interface FooterProps {
  exhibitors?: {
    companyName: string;
    country: string;
    href: string;
  }[];
}

const Footer = ({ exhibitors = [] }: FooterProps) => {
  return (
    <footer className="bg-gradient-to-b from-black to-[#392259] text-[#e5dcee] py-8 px-6 mt-10 font-arimo">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-lg font-semibold text-white">Cavli Hubble</p>
          <p className="text-sm mt-2">IoT Connectivity &amp; Modem Management Platform</p>
        </div>
        
        {exhibitors.length > 0 && (
          <div>
            <p className="text-lg font-semibold text-white mb-4">Featured Exhibitors</p>
            <ul className="space-y-2">
              {exhibitors.map((exhibitor, index) => (
                <li key={index}>
                  <a href={exhibitor.href} target="_blank" rel="noreferrer" className="text-sm hover:text-white transition-colors ">
                    {exhibitor.companyName} <span className="text-gray-500 text-xs">({exhibitor.country})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col space-y-2 md:items-end">
          <p className="text-lg font-semibold text-white mb-2">Legal</p>
          <a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="text-sm hover:text-white transition-colors">Contact</a>
        </div>
      </div>
      <div className="mt-8 pt-4 border-t border-[#805d9a] text-sm text-center">
        &copy; {new Date().getFullYear()} Cavli Wireless. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
