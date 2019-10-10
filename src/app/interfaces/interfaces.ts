export interface Login {
  login:string
  password:string
}
export interface Register {
  name:string
  login:string
  password:string
  repassword:string
}
export interface Files {
  id:number
  user_id:string
  originalname:string
  mimetype:string
  filename:string
  size:number
  created_at:string
  note:string
}
