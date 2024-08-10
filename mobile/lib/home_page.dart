import 'package:flutter/material.dart';
import 'completed_course.dart';
import 'progress_course.dart';
import 'chat.dart';
import 'package:provider/provider.dart';
import 'components/theme_provider.dart'; // Import your ThemeProvider

class HomePage extends StatefulWidget {
  final String userID;

  HomePage({required this.userID});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  static List<Widget> _pages(String userID) => <Widget>[
    HomeContent(), // Updated to add the new content
    CompletedCoursesPage(),
    OnProgressCoursesPage(),
    ChatPage(userID: userID), // Pass the userID here
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Schola',
          style: const TextStyle(
            color: Color.fromARGB(255, 203, 167, 211),
            fontSize: 24,
            fontStyle: FontStyle.italic,
            fontWeight: FontWeight.w500,
            letterSpacing: 1.5,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.brightness_6),
            onPressed: () {
              themeProvider.toggleTheme();
            },
          ),
        ],
      ),
      body: _pages(widget.userID)[_selectedIndex], // Use the userID in the pages
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.check_circle),
            label: 'Completed',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.hourglass_empty),
            label: 'In Progress',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.chat),
            label: 'Chat',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color.fromARGB(255, 203, 167, 211),
        unselectedItemColor: Colors.grey,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}

// HomeContent widget for the search bar, headings, and flashcards
class HomeContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Search Bar
            TextField(
              decoration: InputDecoration(
                hintText: 'Search...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(30.0),
                ),
                filled: true,
                fillColor: Colors.grey[200],
              ),
            ),
            SizedBox(height: 20),

            // Courses Heading and Cards
            Section(title: 'Courses', cardCount: 3),

            // Lectures Heading and Cards
            Section(title: 'Lectures', cardCount: 3),

            // Notes Heading and Cards
            Section(title: 'Notes', cardCount: 3),
          ],
        ),
      ),
    );
  }
}

// Section widget for headings and flashcards
class Section extends StatelessWidget {
  final String title;
  final int cardCount;

  Section({required this.title, required this.cardCount});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
            color: Color.fromARGB(255, 203, 167, 211),
          ),
        ),
        SizedBox(height: 10),
        Wrap(
          spacing: 10.0,
          runSpacing: 10.0,
          children: List.generate(cardCount, (index) {
            return FlashCard(
              content: '$title Dummy Content ${index + 1}',
              color: Colors.primaries[index % Colors.primaries.length],
            );
          }),
        ),
        SizedBox(height: 20),
      ],
    );
  }
}

// FlashCard widget
class FlashCard extends StatelessWidget {
  final String content;
  final Color color;

  FlashCard({required this.content, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width - 20,
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(12.0),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 4.0,
            offset: Offset(2, 2),
          ),
        ],
      ),
      child: Text(
        content,
        style: TextStyle(
          fontSize: 16,
          color: Colors.white,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }
}
