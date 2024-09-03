import { NextResponse, NextRequest } from 'next/server';
import UserModel from '@/models/user.model';
import { sendEmail } from '@/helpers/mailer';

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Send the reset email
        await sendEmail({
            email: user.email,
            emailType: 'reset',
            userId: user._id
        });

        return NextResponse.json({ message: 'Reset link sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
