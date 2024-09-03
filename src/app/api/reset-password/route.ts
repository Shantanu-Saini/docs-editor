import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import UserModel from '@/models/user.model';

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters" },
                { status: 400 }
            )
        }

        // Find user by token and check expiry
        const user = await UserModel.findOne({
            forgetPasswordToken: token,
            forgetPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Token is invalid or has expired' }, { status: 400 });
        }

        // Hash new password and save
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
