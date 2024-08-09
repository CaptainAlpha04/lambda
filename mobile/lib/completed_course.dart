import 'package:flutter/material.dart';

class CompletedCoursesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Completed Courses"),
      ),
      body: Center(
        child: Text('List of Completed Courses'),
      ),
    );
  }
}
