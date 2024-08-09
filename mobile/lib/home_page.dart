import 'package:flutter/material.dart';
import 'completed_course.dart';
import 'progress_course.dart';
import 'chat.dart';


class HomePage extends StatelessWidget {
   final String userID;

  HomePage({required this.userID});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home Page"),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blueAccent,
              ),
              child: Text(
                'Education App',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              leading: Icon(Icons.check_circle),
              title: Text('Completed Courses'),
              onTap: () {
                // Navigate to Completed Courses page
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => CompletedCoursesPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.hourglass_empty),
              title: Text('On-Progress Courses'),
              onTap: () {
                // Navigate to On-Progress Courses page
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => OnProgressCoursesPage()),
                );
              },
            ),
            ListTile(
              leading: Icon(Icons.exit_to_app),
              title: Text('Sign Out'),
              onTap: () {
                // Handle sign out
                // For example, navigate back to the sign-in page
                Navigator.pop(context); // Close the drawer
                // Add your sign-out logic here
              },
            ),
            ListTile(
              leading: Icon(Icons.chat),
              title: Text('Chat with Mentor'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ChatPage(userID: userID)),
                );
              },
            ),
          ],
        ),
      ),
      body: Center(
        child: Text('Welcome to the Education App'),
      ),
    );
  }
}

