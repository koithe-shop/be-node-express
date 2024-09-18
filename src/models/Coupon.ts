export interface Coupon {
    couponName: string;
    code: string;
    validFrom: Date;
    validTo: Date;
    discountRate: number; // (1 - 100)
    status: number;
    description: string;
  }
  