export interface Certificates {
    origin: string; // Giấy chứng nhận nguồn gốc
    health_status: string; // Tình trạng sức khỏe
    awards: string[]; // Các giấy chứng nhận giải thưởng (nếu có)
  }
  
  export interface Product {
    productName: string;
    status: number; // (Đang bán -  Đã bán - Hàng lỗi - Ký gửi chăm sóc - Ký gửi bán)
    madeBy: string;
    gender: boolean;
    size: number;
    yob: number;
    character: string;
    certificates: Certificates;
    screeningRate: number;
    foodOnDay: number;
    description: string;
    price: number;
    image: string[]; // Array of image URLs (Nhúng)
    categoryId: string; // Foreign key to Category
    genotypeId: string; // Foreign key to Genotype
  }
  