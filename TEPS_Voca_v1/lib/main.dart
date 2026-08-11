import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/voca_provider.dart';
import 'screens/splash_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const TepsVocaApp());
}

class TepsVocaApp extends StatelessWidget {
  const TepsVocaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => VocaProvider(),
      child: MaterialApp(
        title: 'TEPS VOCA',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xFF2563EB),
            primary: const Color(0xFF2563EB),
            surface: Colors.white,
          ),
          scaffoldBackgroundColor: const Color(0xFF0F172A),
          fontFamily: 'Noto Sans KR',
          appBarTheme: const AppBarTheme(
            backgroundColor: Colors.white,
            foregroundColor: Colors.black87,
            elevation: 0,
          ),
        ),
        builder: (context, child) {
          // Responsive mobile frame wrapper for Web/Desktop
          if (kIsWeb) {
            return Container(
              color: const Color(0xFF090D16),
              child: Center(
                child: Container(
                  width: 393,
                  height: 852,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(44),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black54,
                        blurRadius: 40,
                        spreadRadius: 10,
                      ),
                    ],
                  ),
                  clipBehavior: Clip.antiAlias,
                  child: child,
                ),
              ),
            );
          }
          return child ?? const SizedBox();
        },
        home: const SplashScreen(),
      ),
    );
  }
}
