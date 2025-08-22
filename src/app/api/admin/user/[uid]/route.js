import { NextResponse } from 'next/server';
import { auth } from 'firebase-admin';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

// Verify Firebase ID token and check admin role
async function verifyAdminToken(idToken) {
  try {
    const decodedToken = await auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    
    // Check if user exists and has admin role
    const userDoc = await db.collection('Users').doc(uid).get();
    if (!userDoc.exists) {
      return { error: 'User not found', status: 404 };
    }
    
    const userData = userDoc.data();
    if (userData.role !== 'admin') {
      return { error: 'Admin access required', status: 403 };
    }
    
    return { uid, userData };
  } catch (error) {
    console.error('Token verification error:', error);
    return { error: 'Invalid token', status: 401 };
  }
}

// GET - Fetch user data by UID
export async function GET(request, { params }) {
  try {
    const { uid } = params;
    
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify admin token
    const authResult = await verifyAdminToken(idToken);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Fetch user data
    const userDoc = await db.collection('Users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const userData = userDoc.data();
    console.log('Fetched user data:', userData);
    
    // Return user data (excluding sensitive fields)
    const safeUserData = {
      uid: userDoc.id,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      elixir: userData.elixir,
      payment: userData.payment,
      eventName: userData.eventName,
      delegate_kiit: userData.delegate_kiit,
      id_card: userData.id_card,
      wrist_band: userData.wrist_band,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
    
    return NextResponse.json(safeUserData);
    
  } catch (error) {
    console.error('GET user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update user data
export async function PUT(request, { params }) {
  try {
    const { uid } = params;
    
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header required' }, { status: 401 });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify admin token
    const authResult = await verifyAdminToken(idToken);
    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }
    
    // Get request body
    const body = await request.json();
    const { delegate_kiit, id_card, wrist_band } = body;
    
    // Validate input fields
    if (delegate_kiit === undefined || id_card === undefined || wrist_band === undefined) {
      return NextResponse.json({ 
        error: 'Missing required fields: delegate_kiit, id_card, wrist_band' 
      }, { status: 400 });
    }
    
    // Check if user exists
    const userDoc = await db.collection('Users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update user data
    const updateData = {
      delegate_kiit: delegate_kiit.toString().trim(),
      id_card: id_card.toString().trim(),
      wrist_band: wrist_band.toString().trim(),
      updatedAt: new Date().toISOString(),
      updatedBy: authResult.uid,
    };
    
    await db.collection('Users').doc(uid).update(updateData);
    
    // Log admin action
    await db.collection('AdminLogs').add({
      adminUid: authResult.uid,
      adminEmail: authResult.userData.email,
      action: 'UPDATE_USER_STATUS',
      targetUid: uid,
      targetEmail: userDoc.data().email,
      changes: updateData,
      timestamp: new Date().toISOString(),
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'User updated successfully',
      updatedFields: updateData
    });
    
  } catch (error) {
    console.error('PUT user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
