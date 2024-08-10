import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:flutter/material.dart';
import 'home_page.dart';

class SignInScreen extends StatelessWidget {
  final GoogleSignIn _googleSignIn = GoogleSignIn();
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<void> _signInWithGoogle(BuildContext context) async {
    try {
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) return; // User canceled the sign-in

      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;
      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final UserCredential userCredential =
          await _auth.signInWithCredential(credential);

      // Extract the userID from the signed-in user's credentials
      final String userID = userCredential.user?.uid ?? '';

      // Navigate to Home Page after successful sign-in, passing the userID
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (context) =>
                HomePage(userID: userID)), // Pass the userID here
      );
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color.fromARGB(255, 31, 21, 32),
      appBar: AppBar(
        title: Text(
          'Schola-Way To Spark',
          style: TextStyle(
            color: const Color.fromARGB(255, 153, 171, 180),
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        backgroundColor: Color.fromARGB(255, 31, 21, 32),
        elevation: 0,
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Schola',
                style: TextStyle(
                  fontSize: 48,
                  fontWeight: FontWeight.bold,
                  //make it italic
                  fontStyle: FontStyle.italic,
                  color: Color.fromARGB(255, 203, 167, 211),
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              Text(

                'Empower your education journey with Schola. Sign in to continue.',
                style: TextStyle(
                  fontSize: 16,
                  color: const Color.fromARGB(255, 153, 171, 180),
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 40),
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(30.0),
                ),
                child: SignInButton(
                  Buttons.Google,
                  text: "Sign in with Google",
                  onPressed: () => _signInWithGoogle(context),
                  padding: EdgeInsets.all(
                      0), // Remove internal padding to fit the rounded shape
                ),
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
