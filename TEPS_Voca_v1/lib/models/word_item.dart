class WordDetail {
  final String pos;
  final String meaning;

  WordDetail({
    required this.pos,
    required this.meaning,
  });

  factory WordDetail.fromJson(Map<String, dynamic> json) {
    return WordDetail(
      pos: json['pos'] ?? '',
      meaning: json['meaning'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'pos': pos,
      'meaning': meaning,
    };
  }
}

class WordItem {
  final String id;
  final double num;
  final String word;
  final List<WordDetail> details;
  final String dateAdded;
  final String group; // '248' or '900' or custom
  bool isBookmarked;
  bool isMastered;

  WordItem({
    required this.id,
    required this.num,
    required this.word,
    required this.details,
    required this.dateAdded,
    required this.group,
    this.isBookmarked = false,
    this.isMastered = false,
  });

  String get primaryPos => details.isNotEmpty ? details.first.pos : '';

  String get combinedMeaning => details.map((d) => d.meaning).where((m) => m.isNotEmpty).join(', ');

  String get formattedPosMeaningHeader {
    List<String> parts = [];
    for (var detail in details) {
      if (detail.pos.isNotEmpty) parts.add(detail.pos);
    }
    for (var detail in details) {
      if (detail.meaning.isNotEmpty) parts.add(detail.meaning);
    }
    return parts.join(' | ');
  }

  factory WordItem.fromJson(Map<String, dynamic> json, String defaultGroup) {
    var rawDetails = json['details'] as List? ?? [];
    List<WordDetail> detailList = rawDetails.map((d) => WordDetail.fromJson(d)).toList();

    double parsedNum = 0.0;
    if (json['num'] != null) {
      parsedNum = (json['num'] as num).toDouble();
    }

    return WordItem(
      id: '${defaultGroup}_${json['word']}_${parsedNum.toInt()}',
      num: parsedNum,
      word: json['word'] ?? '',
      details: detailList,
      dateAdded: json['dateAdded'] ?? '26.03.30',
      group: json['group'] ?? defaultGroup,
      isBookmarked: json['isBookmarked'] ?? false,
      isMastered: json['isMastered'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'num': num,
      'word': word,
      'details': details.map((d) => d.toJson()).toList(),
      'dateAdded': dateAdded,
      'group': group,
      'isBookmarked': isBookmarked,
      'isMastered': isMastered,
    };
  }
}
