import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/word_item.dart';
import '../providers/voca_provider.dart';

class AddWordScreen extends StatefulWidget {
  const AddWordScreen({super.key});

  @override
  State<AddWordScreen> createState() => _AddWordScreenState();
}

class _AddWordScreenState extends State<AddWordScreen> {
  final _wordController = TextEditingController();
  final _posController = TextEditingController();
  final _meaningController = TextEditingController();

  @override
  void dispose() {
    _wordController.dispose();
    _posController.dispose();
    _meaningController.dispose();
    super.dispose();
  }

  void _saveWord() {
    final wordText = _wordController.text.trim();
    final posText = _posController.text.trim();
    final meaningText = _meaningController.text.trim();

    if (wordText.isEmpty || meaningText.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('영어 단어와 한글 뜻을 입력해주세요.')),
      );
      return;
    }

    final provider = Provider.of<VocaProvider>(context, listen: false);

    final now = DateTime.now();
    final dateStr = '${now.year.toString().substring(2)}.${now.month.toString().padLeft(2, '0')}.${now.day.toString().padLeft(2, '0')}';

    final newWord = WordItem(
      id: 'custom_${DateTime.now().millisecondsSinceEpoch}',
      num: 0,
      word: wordText,
      details: [
        WordDetail(pos: posText.isEmpty ? '명사' : posText, meaning: meaningText)
      ],
      dateAdded: dateStr,
      group: '사용자 추가 목록',
    );

    provider.addCustomWord(newWord);

    Navigator.of(context).pop();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('단어 "$wordText" 이(가) 목록에 추가되었습니다.')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      title: const Row(
        children: [
          Icon(Icons.post_add, color: Colors.black87),
          SizedBox(width: 8),
          Text(
            '목록 추가하기',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
          ),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _wordController,
              decoration: const InputDecoration(
                labelText: '영어 단어',
                hintText: '예: public',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _posController,
              decoration: const InputDecoration(
                labelText: '품사',
                hintText: '예: 형용사',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _meaningController,
              decoration: const InputDecoration(
                labelText: '한글 뜻',
                hintText: '예: 대중의',
                border: OutlineInputBorder(),
              ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('취소', style: TextStyle(color: Colors.grey)),
        ),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF2563EB),
            foregroundColor: Colors.white,
          ),
          onPressed: _saveWord,
          child: const Text('추가하기'),
        ),
      ],
    );
  }
}
