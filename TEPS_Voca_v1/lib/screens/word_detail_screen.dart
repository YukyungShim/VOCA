import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../models/word_item.dart';
import '../providers/voca_provider.dart';
import '../widgets/app_header.dart';
import '../widgets/drawer_menu.dart';

class WordDetailScreen extends StatefulWidget {
  final WordItem word;
  final List<WordItem> wordList;
  final int currentIndex;

  const WordDetailScreen({
    super.key,
    required this.word,
    required this.wordList,
    required this.currentIndex,
  });

  @override
  State<WordDetailScreen> createState() => _WordDetailScreenState();
}

class _WordDetailScreenState extends State<WordDetailScreen> {
  late int _index;

  @override
  void initState() {
    super.initState();
    _index = widget.currentIndex;
  }

  WordItem get currentWord => widget.wordList[_index];

  Future<void> _launchNaverDict(String query, int num) async {
    final Uri url = Uri.parse('https://en.dict.naver.com/#/search?query=${Uri.encodeComponent(query)}');
    if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('네이버 사전 웹페이지를 열 수 없습니다: $url')),
        );
      }
    }
  }

  Future<void> _launchGoogleImages(String query, int num) async {
    final Uri url = Uri.parse('https://www.google.com/search?tbm=isch&q=${Uri.encodeComponent(query)}');
    if (!await launchUrl(url, mode: LaunchMode.externalApplication)) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('구글 이미지 검색을 열 수 없습니다: $url')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VocaProvider>(context);
    final word = currentWord;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const AppHeader(showBackButton: true),
      drawer: const DrawerMenu(),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // --- Word Header Box (WireFrame Screen 4) ---
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text(
                        word.word,
                        style: const TextStyle(
                          fontSize: 38,
                          fontWeight: FontWeight.w900,
                          color: Colors.black87,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(width: 12),
                      IconButton(
                        icon: Icon(
                          word.isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                          color: word.isBookmarked ? const Color(0xFFEAB308) : Colors.grey,
                          size: 28,
                        ),
                        onPressed: () {
                          provider.toggleBookmark(word);
                          setState(() {});
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),

                  // Divider header with pos | meaning (e.g. public | 형용사 | 명사 | 공중의 | 공중)
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    spacing: 8,
                    runSpacing: 6,
                    children: [
                      for (var detail in word.details) ...[
                        if (detail.pos.isNotEmpty)
                          Text(
                            detail.pos,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                          ),
                        const Text('|', style: TextStyle(fontSize: 18, color: Colors.black38)),
                        if (detail.meaning.isNotEmpty)
                          Text(
                            detail.meaning,
                            style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.black87,
                            ),
                          ),
                        const Text('|', style: TextStyle(fontSize: 18, color: Colors.black38)),
                      ],
                    ],
                  ),

                  const SizedBox(height: 36),

                  // --- English Examples Section (WireFrame Screen 4) ---
                  _buildExampleRow(
                    indexLabel: '영어 예문1\n(예문 한글 뜻)',
                    buttonLabel: '네이버 예문 #1',
                    onTap: () => _launchNaverDict('${word.word} example', 1),
                  ),
                  const SizedBox(height: 16),
                  _buildExampleRow(
                    indexLabel: '영어 예문2\n(예문 한글 뜻)',
                    buttonLabel: '네이버 예문 #2',
                    onTap: () => _launchNaverDict('${word.word} sentence', 2),
                  ),
                  const SizedBox(height: 16),
                  _buildExampleRow(
                    indexLabel: '영어 예문3\n(예문 한글 뜻)',
                    buttonLabel: '네이버 예문 #3',
                    onTap: () => _launchNaverDict(word.word, 3),
                  ),

                  const SizedBox(height: 36),

                  // --- Related Images Section (WireFrame Screen 4) ---
                  _buildImageCard(
                    title: '관련 이미지#1',
                    buttonLabel: '구글 검색 이미지 #1',
                    onTap: () => _launchGoogleImages(word.word, 1),
                  ),
                  const SizedBox(height: 20),
                  _buildImageCard(
                    title: '관련 이미지#2',
                    buttonLabel: '구글 검색 이미지 #2',
                    onTap: () => _launchGoogleImages('${word.word} visual', 2),
                  ),
                ],
              ),
            ),
          ),

          // Bottom Previous / Next word navigation bar
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Colors.black12)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF1F5F9),
                    foregroundColor: Colors.black87,
                    elevation: 0,
                  ),
                  onPressed: _index > 0
                      ? () => setState(() => _index--)
                      : null,
                  icon: const Icon(Icons.arrow_back),
                  label: const Text('이전 단어'),
                ),
                Text(
                  '${_index + 1} / ${widget.wordList.length}',
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFF1F5F9),
                    foregroundColor: Colors.black87,
                    elevation: 0,
                  ),
                  onPressed: _index < widget.wordList.length - 1
                      ? () => setState(() => _index++)
                      : null,
                  icon: const Icon(Icons.arrow_forward),
                  label: const Text('다음 단어'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExampleRow({
    required String indexLabel,
    required String buttonLabel,
    required VoidCallback onTap,
  }) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: Text(
            indexLabel,
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w600,
              color: Colors.black87,
              height: 1.3,
            ),
          ),
        ),
        TextButton(
          onPressed: onTap,
          child: Text(
            buttonLabel,
            style: const TextStyle(
              fontSize: 15,
              color: Color(0xFF2563EB),
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildImageCard({
    required String title,
    required String buttonLabel,
    required VoidCallback onTap,
  }) {
    return Container(
      width: double.infinity,
      height: 140,
      decoration: BoxDecoration(
        color: const Color(0xFFE2E8F0),
        borderRadius: BorderRadius.circular(4),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w800,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 6),
            InkWell(
              onTap: onTap,
              child: Text(
                buttonLabel,
                style: const TextStyle(
                  fontSize: 15,
                  color: Color(0xFF2563EB),
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
