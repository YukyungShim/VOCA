import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/voca_provider.dart';
import '../widgets/app_header.dart';
import '../widgets/drawer_menu.dart';
import 'word_detail_screen.dart';
import 'quiz_screen.dart';

class WordListScreen extends StatefulWidget {
  const WordListScreen({super.key});

  @override
  State<WordListScreen> createState() => _WordListScreenState();
}

class _WordListScreenState extends State<WordListScreen> {
  final TextEditingController _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VocaProvider>(context);

    if (provider.viewMode == ViewMode.quiz) {
      return const QuizScreen();
    }

    final words = provider.filteredWords;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const AppHeader(),
      drawer: const DrawerMenu(),
      body: provider.isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Top Search and Filter Bar
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
                  child: Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _searchController,
                          onChanged: (val) => provider.setSearchQuery(val),
                          decoration: InputDecoration(
                            hintText: '단어 또는 뜻 검색...',
                            prefixIcon: const Icon(Icons.search, size: 20),
                            suffixIcon: _searchController.text.isNotEmpty
                                ? IconButton(
                                    icon: const Icon(Icons.clear, size: 18),
                                    onPressed: () {
                                      _searchController.clear();
                                      provider.setSearchQuery('');
                                    },
                                  )
                                : null,
                            isDense: true,
                            contentPadding: const EdgeInsets.all(10),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(8),
                              borderSide: const BorderSide(color: Colors.black26),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        icon: Icon(
                          provider.onlyBookmarked ? Icons.bookmark : Icons.bookmark_border,
                          color: provider.onlyBookmarked ? const Color(0xFFEAB308) : Colors.black54,
                        ),
                        onPressed: () => provider.toggleOnlyBookmarked(),
                        tooltip: '북마크한 단어만 보기',
                      ),
                    ],
                  ),
                ),

                // Sort Options: ABC순 | 최신순 (WireFrame 2)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      GestureDetector(
                        onTap: () => provider.setSortMode(SortMode.abc),
                        child: Text(
                          'ABC순',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: provider.sortMode == SortMode.abc ? FontWeight.w900 : FontWeight.normal,
                            color: provider.sortMode == SortMode.abc ? Colors.black : Colors.black45,
                            decoration: provider.sortMode == SortMode.abc ? TextDecoration.underline : TextDecoration.none,
                          ),
                        ),
                      ),
                      const Padding(
                        padding: EdgeInsets.symmetric(horizontal: 12),
                        child: Text('|', style: TextStyle(fontSize: 18, color: Colors.black38)),
                      ),
                      GestureDetector(
                        onTap: () => provider.setSortMode(SortMode.latest),
                        child: Text(
                          '최신순',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: provider.sortMode == SortMode.latest ? FontWeight.w900 : FontWeight.normal,
                            color: provider.sortMode == SortMode.latest ? Colors.black : Colors.black45,
                            decoration: provider.sortMode == SortMode.latest ? TextDecoration.underline : TextDecoration.none,
                          ),
                        ),
                      ),
                      const Spacer(),
                      Text(
                        '총 ${words.length}개',
                        style: const TextStyle(fontSize: 13, color: Colors.black54, fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 4),

                // Table Header: 영어 단어 | 품사 | 한글 뜻 | 추가일 (WireFrame 2)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      top: BorderSide(color: Colors.black12, width: 1),
                      bottom: BorderSide(color: Colors.black87, width: 2),
                    ),
                  ),
                  child: const Row(
                    children: [
                      Expanded(
                        flex: 3,
                        child: Text(
                          '영어 단어',
                          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Colors.black87),
                        ),
                      ),
                      Expanded(
                        flex: 2,
                        child: Text(
                          '품사',
                          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Colors.black87),
                        ),
                      ),
                      Expanded(
                        flex: 4,
                        child: Text(
                          '한글 뜻',
                          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Colors.black87),
                        ),
                      ),
                      Expanded(
                        flex: 2,
                        child: Text(
                          '추가일',
                          textAlign: TextAlign.right,
                          style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Colors.black87),
                        ),
                      ),
                    ],
                  ),
                ),

                // Word List Rows
                Expanded(
                  child: words.isEmpty
                      ? const Center(
                          child: Text(
                            '검색된 단어가 없습니다.',
                            style: TextStyle(fontSize: 16, color: Colors.black54),
                          ),
                        )
                      : ListView.separated(
                          itemCount: words.length,
                          separatorBuilder: (context, index) => const Divider(height: 1, color: Colors.black12),
                          itemBuilder: (context, index) {
                            final item = words[index];
                            return InkWell(
                              onTap: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (_) => WordDetailScreen(
                                      word: item,
                                      wordList: words,
                                      currentIndex: index,
                                    ),
                                  ),
                                );
                              },
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                                child: Row(
                                  children: [
                                    // 영어 단어
                                    Expanded(
                                      flex: 3,
                                      child: Text(
                                        item.word,
                                        style: const TextStyle(
                                          fontWeight: FontWeight.bold,
                                          fontSize: 16,
                                          color: Colors.black90,
                                        ),
                                      ),
                                    ),
                                    // 품사
                                    Expanded(
                                      flex: 2,
                                      child: Text(
                                        item.primaryPos,
                                        style: TextStyle(
                                          fontSize: 14,
                                          color: Colors.grey.shade700,
                                        ),
                                      ),
                                    ),
                                    // 한글 뜻
                                    Expanded(
                                      flex: 4,
                                      child: Text(
                                        item.combinedMeaning,
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(
                                          fontSize: 14,
                                          color: Colors.black87,
                                        ),
                                      ),
                                    ),
                                    // 추가일
                                    Expanded(
                                      flex: 2,
                                      child: Text(
                                        item.dateAdded,
                                        textAlign: TextAlign.right,
                                        style: TextStyle(
                                          fontSize: 13,
                                          color: Colors.grey.shade600,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                ),
              ],
            ),
    );
  }
}
