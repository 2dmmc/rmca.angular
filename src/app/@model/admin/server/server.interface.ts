export interface Server {
  _id?: string;
  name: string;
  endpoint: string;
  announce: string;
  dynmap?: string;
}
