import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      whatsapp,
      faithDaily,
      conflictStyle,
      datingMotive,
      denomination,
      familyGoals,
      score,
      flag
    } = body;

    if (!email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required.' },
        { status: 400 }
      );
    }

    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert(
        {
          email,
          first_name: firstName,
          last_name: lastName,
          whatsapp_number: whatsapp || null,
          status: 'waitlist'
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (userError) {
      console.error('Error inserting user:', userError);
      return NextResponse.json({ error: 'Failed to record user details.' }, { status: 500 });
    }

    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .insert({
        user_id: user.id,
        faith_in_daily_life: faithDaily || 'active',
        relationship_patterns: 'Standard intake',
        conflict_style: conflictStyle,
        primary_dating_motive: datingMotive,
        denomination,
        family_goals: familyGoals,
        calculated_score: score,
        internal_flag: flag
      })
      .select()
      .single();

    if (assessmentError) {
      console.error('Error inserting assessment:', assessmentError);
      return NextResponse.json({ error: 'Failed to record assessment.' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, userId: user.id, assessmentId: assessment.id, flag },
      { status: 201 }
    );
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
