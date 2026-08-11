import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import '../models/word_item.dart';

enum SortMode { abc, latest }
enum ViewMode { wordList, quiz }

class VocaProvider with ChangeNotifier {
  List<WordItem> _allWords = [];
  List<WordItem> _words248 = [];
  List<WordItem> _words900 = [];
  
  String _selectedGroup = 'ALL'; // 'ALL', '248', '900', or custom group name
  SortMode _sortMode = SortMode.abc;
  ViewMode _viewMode = ViewMode.wordList;
  String _searchQuery = '';
  bool _onlyBookmarked = false;
  bool _isLoading = true;

  VocaProvider() {
    loadData();
  }

  // Getters
  bool get isLoading => _isLoading;
  String get selectedGroup => _selectedGroup;
  SortMode get sortMode => _sortMode;
  ViewMode get viewMode => _viewMode;
  String get searchQuery => _searchQuery;
  bool get onlyBookmarked => _onlyBookmarked;

  int get totalCount => _allWords.length;
  int get count248 => _words248.length;
  int get count900 => _words900.length;

  Future<void> loadData() async {
    _isLoading = true;
    notifyListeners();

    try {
      final String response = await rootBundle.loadString('assets/data/teps_voca_data.json');
      final data = json.decode(response);

      List<WordItem> list248 = [];
      if (data['group_248'] != null) {
        for (var item in data['group_248']) {
          list248.add(WordItem.fromJson(item, '선별 영어단어 248개'));
        }
      }

      List<WordItem> list900 = [];
      if (data['group_900'] != null) {
        for (var item in data['group_900']) {
          list900.add(WordItem.fromJson(item, '영어단어 900개'));
        }
      }

      _words248 = list248;
      _words900 = list900;

      // Combine for 'ALL'
      Map<String, WordItem> combinedMap = {};
      for (var w in list248) {
        combinedMap[w.word.toLowerCase()] = w;
      }
      for (var w in list900) {
        if (!combinedMap.containsKey(w.word.toLowerCase())) {
          combinedMap[w.word.toLowerCase()] = w;
        }
      }
      _allWords = combinedMap.values.toList();

    } catch (e) {
      if (kDebugMode) {
        print("Error loading vocabulary data: $e");
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  List<WordItem> get filteredWords {
    List<WordItem> sourceList = [];
    if (_selectedGroup == '248' || _selectedGroup == '선별 영어단어 248개') {
      sourceList = List.from(_words248);
    } else if (_selectedGroup == '900' || _selectedGroup == '영어단어 900개') {
      sourceList = List.from(_words900);
    } else {
      sourceList = List.from(_allWords);
    }

    if (_onlyBookmarked) {
      sourceList = sourceList.where((w) => w.isBookmarked).toList();
    }

    if (_searchQuery.trim().isNotEmpty) {
      String q = _searchQuery.trim().toLowerCase();
      sourceList = sourceList.where((w) {
        bool wordMatch = w.word.toLowerCase().contains(q);
        bool meaningMatch = w.details.any((d) => d.meaning.contains(q));
        return wordMatch || meaningMatch;
      }).toList();
    }

    if (_sortMode == SortMode.abc) {
      sourceList.sort((a, b) => a.word.toLowerCase().compareTo(b.word.toLowerCase()));
    } else {
      // Sort by num or original order
      sourceList.sort((a, b) => a.num.compareTo(b.num));
    }

    return sourceList;
  }

  void setSelectedGroup(String group) {
    _selectedGroup = group;
    notifyListeners();
  }

  void setSortMode(SortMode mode) {
    _sortMode = mode;
    notifyListeners();
  }

  void setViewMode(ViewMode mode) {
    _viewMode = mode;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  void toggleOnlyBookmarked() {
    _onlyBookmarked = !_onlyBookmarked;
    notifyListeners();
  }

  void toggleBookmark(WordItem item) {
    item.isBookmarked = !item.isBookmarked;
    notifyListeners();
  }

  void addCustomWord(WordItem newWord) {
    _allWords.insert(0, newWord);
    notifyListeners();
  }
}
