import { Product, Order, User, BlogPost, Category, Address } from '../types';

export const initialCategories: Category[] = ["Üst Giyim", "Alt Giyim", "Dış Giyim", "Aksesuar"];

const defaultAddress: Address = {
  street: "Karadeniz Sahil Yolu No: 19",
  city: "Trabzon",
  zip: "61000",
};

export const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

export const initialUsers: User[] = [
  {
    id: 1,
    name: "Zeynep Karadeniz",
    email: "zeynep@example.com",
    password: "password123",
    addresses: [defaultAddress],
    wishlist: [2, 5],
  }
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Fırtına Mavisi Hoodie",
    slug: "firtina-mavisi-hoodie",
    price: 850,
    description: "Yoğun bir günden sonra sizi saran Karadeniz sakinliği. Kaliteli kanguru cebi ve bol kesimi ile.",
    category: "Üst Giyim",
    images: ["https://picsum.photos/id/1011/800/800", "https://picsum.photos/id/1012/800/800", "https://picsum.photos/id/1013/800/800"],
    sizes: ["S", "M", "L", "XL"],
    color: "Fırtına Mavisi",
    stock: 25,
    material: "%80 Pamuk, %20 Polyester",
    care: "30 derecede makinede yıkayınız. Ağartıcı kullanmayınız.",
    reviews: [
      { id: 1, author: "Ali V.", rating: 5, comment: "Rengi tam göründüğü gibi, kumaşı çok kaliteli. Fırtınalı havalarda içimi ısıtıyor.", date: "2024-07-15" },
      { id: 2, author: "Elif K.", rating: 4, comment: "Biraz bol geldi ama oversize sevdiğim için sorun olmadı. Çok rahat.", date: "2024-07-20" },
    ],
  },
  {
    id: 2,
    name: "Yeşilova Yeşili T-Shirt",
    slug: "yesilova-yesili-t-shirt",
    price: 450,
    description: "Yaylaların taze havası. %100 pamuk, nefes alabilir yapısı ile tüm günün rahatlığı.",
    category: "Üst Giyim",
    images: ["https://picsum.photos/id/48/800/800", "https://picsum.photos/id/58/800/800", "https://picsum.photos/id/96/800/800"],
    sizes: ["S", "M", "L"],
    color: "Yeşilova Yeşili",
    stock: 50,
    material: "%100 Organik Pamuk",
    care: "Soğuk suda yıkayınız. Düşük devirde kurutunuz.",
    reviews: [
      { id: 3, author: "Mehmet A.", rating: 5, comment: "Yumuşacık bir dokusu var. Rengi harika, tam bir yayla yeşili.", date: "2024-06-10" },
    ],
  },
  {
    id: 3,
    name: "Ahşap Bej Kargo Pantolon",
    slug: "ahsap-bej-kargo-pantolon",
    price: 1200,
    description: "Rahatlık ve şıklığı bir arada arayanlar. Dayanıklı kumaşı ve bol cepleri ile maceraya hazır.",
    category: "Alt Giyim",
    images: ["https://picsum.photos/id/1025/800/800", "https://picsum.photos/id/1026/800/800", "https://picsum.photos/id/1028/800/800"],
    sizes: ["M", "L", "XL"],
    color: "Ahşap Beji",
    stock: 0, // Out of stock example
    material: "Dayanıklı Kanvas Kumaş",
    care: "Ters çevirerek yıkayınız. Ütülemeyiniz.",
    reviews: [
       { id: 4, author: "Selin T.", rating: 5, comment: "Hem şık hem de çok kullanışlı. Kumaşı çok sağlam.", date: "2024-05-25" },
       { id: 5, author: "Can B.", rating: 4, comment: "Kalıbı beklediğimden biraz daha geniş ama iade etmeyeceğim, çok beğendim.", date: "2024-06-01" },
    ],
  },
  {
    id: 4,
    name: "Köpük Beyazı Gömlek",
    slug: "kopuk-beyazi-gomlek",
    price: 780,
    description: "Karadeniz'in dalgalarının köpüğünden ilham alan, keten karışımlı ferah bir gömlek.",
    category: "Üst Giyim",
    images: ["https://picsum.photos/id/349/800/800", "https://picsum.photos/id/350/800/800"],
    sizes: ["S", "M", "L", "XL"],
    color: "Köpük Beyazı",
    stock: 30,
    material: "%70 Keten, %30 Viskon",
    care: "Ilık suda elde yıkayınız.",
    reviews: [],
  },
  {
    id: 5,
    name: "Paslı Turuncu Yağmurluk",
    slug: "pasli-turuncu-yagmurluk",
    price: 1850,
    description: "Gün batımının paslı tonları, Karadeniz'in aniden bastıran yağmurlarına karşı. Su geçirmez ve rüzgar kesici.",
    category: "Dış Giyim",
    images: ["https://picsum.photos/id/1040/800/800", "https://picsum.photos/id/1041/800/800"],
    sizes: ["M", "L"],
    color: "Paslı Turuncu",
    stock: 4, // Low stock example
    material: "Geri dönüştürülmüş polyester",
    care: "Sadece kuru temizleme.",
    reviews: [
      { id: 6, author: "Fatma G.", rating: 5, comment: "Rengi muhteşem! İnce ama çok iyi koruyor. Tam bir bahar ceketi.", date: "2024-04-18" },
    ],
  },
  {
    id: 6,
    name: "Sis Grisi Bere",
    slug: "sis-grisi-bere",
    price: 250,
    description: "Yaylaların aniden çöken sisinden ilham. Yumuşak dokusuyla başınızı sıcak tutar.",
    category: "Aksesuar",
    images: ["https://picsum.photos/id/62/800/800", "https://picsum.photos/id/63/800/800"],
    sizes: ["S", "M"],
    color: "Fırtına Mavisi",
    stock: 60,
    material: "Yün Karışımı",
    care: "Elde yıkayınız.",
    reviews: [],
  }
];

export const initialOrders: Order[] = [
  {
    id: "PW-001",
    userId: 1,
    customerName: "Zeynep Karadeniz",
    date: "2024-07-28",
    items: [
      { ...initialProducts[0], quantity: 1, selectedSize: "M", reviews: [] },
      { ...initialProducts[1], quantity: 1, selectedSize: "L", reviews: [] },
    ],
    total: 1300,
    status: "Tamamlandı",
    shippingAddress: defaultAddress,
    trackingNumber: "KRDNZ123456789",
  },
  {
    id: "PW-002",
    userId: 1,
    customerName: "Zeynep Karadeniz",
    date: "2024-07-29",
    items: [
      { ...initialProducts[2], quantity: 1, selectedSize: "L", reviews: [] },
    ],
    total: 1200,
    status: "Kargoya Verildi",
    shippingAddress: defaultAddress,
    trackingNumber: "KRDNZ987654321",
  },
  {
    id: "PW-003",
    userId: 1,
    customerName: "Zeynep Karadeniz",
    date: "2024-07-30",
    items: [
      { ...initialProducts[4], quantity: 1, selectedSize: "M", reviews: [] },
    ],
    total: 1850,
    status: "Hazırlanıyor",
    shippingAddress: defaultAddress,
  },
];

export const initialBlogPosts: BlogPost[] = [
    {
        id: 1,
        slug: "karadenizde-ilham-perileri",
        title: "Karadeniz'de İlham Perileri",
        author: "Pun Wear Ekibi",
        date: "2024-07-25",
        imageUrl: "https://picsum.photos/id/10/1200/600",
        content: `
<p>Her koleksiyonumuzun ardında bir hikaye, her dikişin ardında bir his var. Bizim ilham perilerimiz, Karadeniz'in ta kendisi. Fırtınalı bir günde denizin aldığı koyu mavi, bir yayla evinin ahşap duvarına vuran güneşin sıcaklığı, aniden bastıran bir yağmurun ardından çıkan toprak kokusu... Bunlar, renklerimize, dokularımıza ve tasarımlarımıza yön veren sessiz rehberlerimizdir.</p>
<p>Bu topraklarda doğa, sadece bir manzara değil, aynı zamanda bir yaşam biçimidir. Dirençli, cömert ve her zaman şaşırtıcı. Biz de Pun Wear olarak bu ruhu, giysilerimiz aracılığıyla sizlere ulaştırmayı hedefliyoruz.</p>
        `,
    },
    {
        id: 2,
        slug: "kumaslarimizin-hikayesi",
        title: "Kumaşlarımızın Hikayesi: Doğallık ve Dayanıklılık",
        author: "Pun Wear Ekibi",
        date: "2024-07-18",
        imageUrl: "https://picsum.photos/id/305/1200/600",
        content: `
<p>Bir giysinin kalitesini belirleyen en önemli unsur, kumaşıdır. Biz Pun Wear olarak, doğallığı ve dayanıklılığı bir arada sunan materyalleri seçmeye özen gösteriyoruz. Organik pamuğun nefes alan yapısı, ketenin serinletici dokusu ve geri dönüştürülmüş ipliklerin sürdürülebilir gücü... Her bir kumaş seçimimiz, hem size konfor sunma hem de doğaya saygı duruşunda bulunma amacını taşır.</p>
<p>Kumaşlarımız, sadece birer iplik yumağı değil, Karadeniz'in rüzgarını, yağmurunu ve güneşini teninizde hissetmeniz için birer araçtır.</p>
        `,
    },
];