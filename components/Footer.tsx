
import React from 'react';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-wood-beige hover:text-rusty-orange transition-colors duration-300">
    {children}
  </a>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-storm-blue text-wood-beige pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-poppins font-bold mb-4">Pun Wear</h3>
            <p className="font-lato max-w-xs mx-auto md:mx-0">
              Karadeniz'in ruhunu, doğallığını ve direncini her bir dikişimize işledik.
            </p>
          </div>
          <div className="md:col-span-2">
             <h3 className="text-xl font-poppins font-bold mb-4">Fırtınalardan ilk sen haberdar ol!</h3>
             <p className="font-lato mb-4">E-bültenimize abone ol, yeni koleksiyonları ve özel indirimleri kaçırma.</p>
             <form className="flex flex-col sm:flex-row max-w-md mx-auto md:mx-0">
                <input 
                  type="email" 
                  placeholder="E-posta adresiniz"
                  className="w-full px-4 py-3 rounded-md sm:rounded-r-none text-storm-blue focus:outline-none focus:ring-2 focus:ring-teal-accent mb-2 sm:mb-0"
                  required
                />
                <button type="submit" className="bg-rusty-orange text-white font-bold py-3 px-6 rounded-md sm:rounded-l-none hover:bg-opacity-90 transition-colors">
                  Abone Ol
                </button>
             </form>
          </div>
        </div>
        <div className="flex justify-center space-x-6 my-10">
          <SocialIcon href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.197-4.354-2.624-6.78-6.979-6.98-1.28-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
          </SocialIcon>
          <SocialIcon href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.296 1.634 4.208 3.803 4.649-.67.183-1.37.223-2.067.087.616 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.588-7.52 2.588-.49 0-.974-.028-1.455-.086 2.685 1.725 5.872 2.729 9.284 2.729 11.16 0 17.278-9.256 17.278-17.279 0-.263-.006-.525-.018-.786.96-.69 1.798-1.56 2.457-2.549z"/></svg>
          </SocialIcon>
          <SocialIcon href="#">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
          </SocialIcon>
        </div>
        <div className="border-t border-wood-beige/20 pt-8 text-center">
          <p className="font-lato text-sm">&copy; {new Date().getFullYear()} Pun Wear. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};