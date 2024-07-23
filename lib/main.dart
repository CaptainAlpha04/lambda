import 'package:flutter/material.dart';

void main() {
  runApp(const App());
}

class App extends StatefulWidget {
  const App({super.key});

  @override
  State<App> createState() => _AppState();
}

class _AppState extends State<App> {
  int value = 0;

  void majorIncrement() {
    setState(() {
      value += 10;
    });
  }

  void minorIncrement() {
    setState(() {
      value += 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        backgroundColor: Colors.grey[900],
        appBar: AppBar(
          backgroundColor: Colors.grey[900],
          leading: const Icon(
            Icons.more_vert_outlined,
            color: Colors.orange,
          ),
          actions: [
            IconButton(
              icon: const Icon(
                Icons.history,
                color: Colors.orange,
              ),
              onPressed: () {},
            ),
          ],
        ),
        body: Center(
            child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$value',
              style: const TextStyle(
                color: Colors.orange,
                fontSize: 70,
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Padding(
                  padding: const EdgeInsets.all(5),
                  child: FilledButton(
                    onPressed: majorIncrement,
                    child: const Text('Major Increment'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(5),
                  child: FilledButton(
                    onPressed: minorIncrement,
                    child: const Text('Minor Increment'),
                  ),
                ),
              ],
            )
          ],
        )),
      ),
    );
  }
}
