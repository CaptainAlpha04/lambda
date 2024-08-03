import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'sign_in_screen.dart'; // Import your sign-in screen

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SignInScreen(), // Use SignInScreen
    );
  }
}
