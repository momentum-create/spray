export type ApiLocale = "ja" | "en";

export type FormErrorCode =
  | "VALIDATION"
  | "RECAPTCHA"
  | "RATE_LIMIT"
  | "SERVER"
  | "CHECKOUT_NOT_CONFIGURED";

export type ContactSubject = "visit" | "product" | "school" | "other";

export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject: ContactSubject;
  message: string;
  locale: ApiLocale;
  privacyAccepted: true;
  recaptchaToken: string;
  website?: string;
}

export type BoardType = "snowboard" | "skateboard" | "both";

export type OwlGoggleModel = "flow" | "vent" | "both";
export type OwlGoggleBuckle = "with" | "without";
export type OwlGoggleFulfillment = "pickup" | "ship";

export interface OwlGoggleReserveFormRequest {
  name: string;
  email: string;
  phone: string;
  model: OwlGoggleModel;
  buckle: OwlGoggleBuckle;
  quantity: number;
  fulfillment: OwlGoggleFulfillment;
  note?: string;
  locale: ApiLocale;
  privacyAccepted: true;
  recaptchaToken: string;
  website?: string;
}

export interface MaintenanceRequestFormRequest {
  name: string;
  email: string;
  phone: string;
  boardType: BoardType;
  boardSize?: string;
  requestDetail: string;
  locale: ApiLocale;
  privacyAccepted: true;
  recaptchaToken: string;
  website?: string;
}

export interface FormSuccessResponse {
  ok: true;
  checkoutUrl?: string;
}

export interface FormErrorResponse {
  ok: false;
  error: FormErrorCode;
  message?: string;
  fields?: Partial<Record<string, string>>;
}

export type FormResponse = FormSuccessResponse | FormErrorResponse;
