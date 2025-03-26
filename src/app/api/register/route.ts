import { NextResponse } from 'next/server';
import { sessionUtils } from '@/utils/session';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, phone } = await request.json();

    // Validate input
    if (!firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Create user using sessionUtils
    const user = await sessionUtils.createUserFromSession({
      first_name: firstName,
      last_name: lastName,
      phone: phone.toString(),
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création du compte' },
      { status: 500 }
    );
  }
}