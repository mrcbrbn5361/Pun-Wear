
import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-foam-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-storm-blue">
          <h1 className="text-5xl font-poppins font-bold text-center mb-8">Markamızın Hikayesi</h1>
          <div className="flex justify-center mb-12">
            <img 
              src="https://picsum.photos/id/1060/800/400" 
              alt="Karadeniz Manzarası"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="prose prose-lg max-w-none font-lato text-gray-700 leading-relaxed">
            <p>
              Pun Wear, adındaki kelime oyununun ötesinde, derin bir coğrafyanın ruhunu taşıyan bir markadır. Her şey, Karadeniz'in hırçın dalgalarının kıyıya vuruşunda, yemyeşil yaylaların üzerine çöken sisin gizeminde ve ahşap evlerin sıcaklığında gizli. Biz, bu coğrafyanın dokusunu, hissini ve hikayesini modern tasarımlarla buluşturmak için yola çıktık.
            </p>
            <h2 className="font-poppins text-storm-blue">Üretim Felsefemiz</h2>
            <p>
              "Doğadan İlham, Modern Dokunuş" mottomuzla, tasarımlarımızda doğallığı ve sadeliği ön planda tutuyoruz. Fırtınalı bir denizin mavisinden, bir ormanın en canlı yeşilinden ve asırlık ahşapların bej tonlarından oluşan renk paletimiz, Karadeniz'in ta kendisidir. Kullandığımız her kumaş, attığımız her dikiş, dayanıklılığı ve konforu bir araya getirme amacını taşır.
            </p>
            <p>
              Yerel ilham kaynaklarımıza sadık kalarak, evrensel bir stil yaratıyoruz. Amacımız, sadece bir giysi sunmak değil, aynı zamanda giyen herkese Karadeniz'in o eşsiz atmosferini hissettirmektir. Fırtınanın hemen sonrası deniz kokusunun ve çayın buharının birleştiği o anki tazeliği, giysilerimizde yaşatmayı hedefliyoruz.
            </p>
            <p>
              Pun Wear ailesi olarak, köklerimizden aldığımız ilhamla geleceğe bakıyor, hikayemizi sizinle birlikte yazmaya devam ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
