import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith("/karyawan")) {
        // jika url diawali dengan /karyawan akan dilindungi 

        // ambil data token dari cookie
        const token = request.cookies.get(`token`)?.value

        // prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/"
        // karena jika slice "/" aja akan ke halaman login, url halaman login

        if(typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyKaryawan(token ?? "")
        if(!isVerifiedToken) {
            return NextResponse.redirect(redirectLogin)
        }

        return NextResponse.next()
    }

    if (request.nextUrl.pathname.startsWith("/pelanggan")) {
        // jika url diawali dengan /karyawan akan dilindungi 

        // ambil data token dari cookie
        const token = request.cookies.get(`token`)?.value

        // prepare redirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/"
        // karena jika slice "/" aja akan ke halaman login, url halaman login

        if(typeof token === undefined) {
            return NextResponse.redirect(redirectLogin)
        }

        const isVerifiedToken = await verifyPelanggan(token ?? "")
        if(!isVerifiedToken) {
            return NextResponse.redirect(redirectLogin)
        }

        return NextResponse.next()
    }
    return NextResponse.next();
}

// menentukan route mana saja yang akan memberlakukan proses middleware
// * adalah semua
// semua folder akan di lindungi
export const config = {
    matcher: [
        "/karyawan/:path*",
        "/pelanggan/:path*"
    ]
}