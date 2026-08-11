import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/voca_provider.dart';
import '../screens/add_word_screen.dart';

class DrawerMenu extends StatelessWidget {
  const DrawerMenu({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<VocaProvider>(context);

    return Drawer(
      child: Container(
        color: const Color(0xFFE2E8F0),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Main Sections List
              Expanded(
                child: ListView(
                  padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 20),
                  children: [
                    // --- SECTION 1: 단어 ---
                    _buildCategoryHeader('단어'),
                    const SizedBox(height: 8),
                    _buildSubMenuItem(
                      context,
                      title: '단어장',
                      isSelected: provider.viewMode == ViewMode.wordList,
                      onTap: () {
                        provider.setViewMode(ViewMode.wordList);
                        Navigator.of(context).pop();
                      },
                    ),
                    _buildSubMenuItem(
                      context,
                      title: '단어테스트',
                      isSelected: provider.viewMode == ViewMode.quiz,
                      onTap: () {
                        provider.setViewMode(ViewMode.quiz);
                        Navigator.of(context).pop();
                      },
                    ),
                    const SizedBox(height: 24),

                    // --- SECTION 2: 숙어 ---
                    _buildCategoryHeader('숙어'),
                    const SizedBox(height: 8),
                    _buildSubMenuItem(
                      context,
                      title: '단어장',
                      isSelected: false,
                      onTap: () {
                        provider.setSelectedGroup('숙어');
                        provider.setViewMode(ViewMode.wordList);
                        Navigator.of(context).pop();
                      },
                    ),
                    _buildSubMenuItem(
                      context,
                      title: '단어테스트',
                      isSelected: false,
                      onTap: () {
                        provider.setSelectedGroup('숙어');
                        provider.setViewMode(ViewMode.quiz);
                        Navigator.of(context).pop();
                      },
                    ),
                    const SizedBox(height: 28),

                    const Divider(color: Colors.black26, thickness: 1),
                    const SizedBox(height: 16),

                    // --- SECTION 3: Excel Groups (Requirement) ---
                    _buildCategoryHeader('단어 그룹 선택'),
                    const SizedBox(height: 8),
                    _buildGroupTile(
                      context,
                      title: '전체 보기',
                      countBadge: '${provider.totalCount}개',
                      isSelected: provider.selectedGroup == 'ALL',
                      onTap: () {
                        provider.setSelectedGroup('ALL');
                        Navigator.of(context).pop();
                      },
                    ),
                    _buildGroupTile(
                      context,
                      title: '선별 영어단어 248개',
                      countBadge: '${provider.count248}개',
                      isSelected: provider.selectedGroup == '248' || provider.selectedGroup == '선별 영어단어 248개',
                      onTap: () {
                        provider.setSelectedGroup('248');
                        Navigator.of(context).pop();
                      },
                    ),
                    _buildGroupTile(
                      context,
                      title: '영어단어 900개 (387점용)',
                      countBadge: '${provider.count900}개',
                      isSelected: provider.selectedGroup == '900' || provider.selectedGroup == '영어단어 900개',
                      onTap: () {
                        provider.setSelectedGroup('900');
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                ),
              ),

              // Bottom Button: 목록 추가하기
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black87,
                    elevation: 0,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(6),
                      side: const BorderSide(color: Colors.black45, width: 1),
                    ),
                  ),
                  onPressed: () {
                    Navigator.of(context).pop();
                    showDialog(
                      context: context,
                      builder: (ctx) => const AddWordScreen(),
                    );
                  },
                  child: const Text(
                    '목록 추가하기',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 12),

              // Bottom User Profile Header: Avatar + 홍길동
              Container(
                padding: const EdgeInsets.all(20),
                decoration: const BoxDecoration(
                  border: Border(top: BorderSide(color: Colors.black12)),
                ),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: const BoxDecoration(
                        color: Colors.black87,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.person,
                        color: Colors.white,
                        size: 26,
                      ),
                    ),
                    const SizedBox(width: 16),
                    const Text(
                      '홍길동',
                      style: TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        color: Colors.black87,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryHeader(String title) {
    return Text(
      title,
      style: const TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.w900,
        color: Colors.black87,
        letterSpacing: -1,
      ),
    );
  }

  Widget _buildSubMenuItem(
    BuildContext context, {
    required String title,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 4),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 22,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
            color: isSelected ? const Color(0xFF2563EB) : Colors.black87,
          ),
        ),
      ),
    );
  }

  Widget _buildGroupTile(
    BuildContext context, {
    required String title,
    required String countBadge,
    required bool isSelected,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      decoration: BoxDecoration(
        color: isSelected ? Colors.white : Colors.transparent,
        borderRadius: BorderRadius.circular(8),
        border: isSelected ? Border.all(color: Colors.black38) : null,
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
        dense: true,
        title: Text(
          title,
          style: TextStyle(
            fontSize: 16,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
            color: isSelected ? const Color(0xFF1E40AF) : Colors.black87,
          ),
        ),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
          decoration: BoxDecoration(
            color: isSelected ? const Color(0xFFDBEAFE) : Colors.black12,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            countBadge,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isSelected ? const Color(0xFF1E40AF) : Colors.black87,
            ),
          ),
        ),
        onTap: onTap,
      ),
    );
  }
}
