// Dữ liệu nội dung hoàn chỉnh trích xuất trực tiếp từ đồ án Figma Camind (Triết học Mác - Lênin)

export const THINKERS_DATA = {
  marx: {
    id: 'marx',
    name: 'KARL MARX',
    number: '01',
    years: '1818 - 1883',
    bio: 'Nhà triết học, nhà kinh tế chính trị và nhà tư tưởng người Đức, là một trong những người sáng lập chủ nghĩa Marx.',
    quote: '"Không phải ý thức của con người quyết định sự tồn tại của họ, mà ngược lại, sự tồn tại xã hội của họ quyết định ý thức của họ."',
    milestones: [
      { year: '1818', desc: 'Sinh tại Trier, Phổ' },
      { year: '1844', desc: 'Bắt đầu hợp tác sâu sắc với Engels' },
      { year: '1848', desc: 'Công bố Tuyên ngôn của Đảng Cộng sản' },
      { year: '1867', desc: 'Xuất bản tập I của tác phẩm Tư bản' },
      { year: '1883', desc: 'Qua đời tại London, Anh' }
    ],
    contribution: 'Xây dựng quan điểm duy vật và cách tiếp cận biện chứng đối với đời sống xã hội. Nhấn mạnh vai trò của điều kiện thực tế, đời sống vật chất và hoạt động thực tiễn.',
    image: '/assets/marx.png',
    archiveLabel: 'Hồ sơ tư tưởng nền tảng triết học biện chứng'
  },
  engels: {
    id: 'engels',
    name: 'FRIEDRICH ENGELS',
    number: '02',
    years: '1820 - 1895',
    bio: 'Nhà lý luận chính trị, nhà triết học người Đức, người bạn đồng hành vĩ đại cùng Marx sáng lập chủ nghĩa cộng sản khoa học.',
    quote: '"Tự nhiên không tự thỏa mãn với chính mình, con người phải cải biến tự nhiên bằng hoạt động thực tiễn của mình."',
    milestones: [
      { year: '1820', desc: 'Sinh tại Barmen, Vương quốc Phổ' },
      { year: '1845', desc: 'Xuất bản Tình cảnh giai cấp công nhân Anh' },
      { year: '1878', desc: 'Công bố tác phẩm Biện chứng của tự nhiên và Chống Dühring' },
      { year: '1885', desc: 'Hoàn tất biên tập và xuất bản Tư bản tập II & III' },
      { year: '1895', desc: 'Qua đời tại London, Anh' }
    ],
    contribution: 'Hệ thống hóa triết học duy vật biện chứng, làm rõ các quy luật phát triển của tự nhiên, xã hội và tư duy con người.',
    image: '/assets/engels.png',
    archiveLabel: 'Hồ sơ hệ thống hóa phép biện chứng duy vật'
  },
  lenin: {
    id: 'lenin',
    name: 'V.I. LENIN',
    number: '03',
    years: '1870 - 1924',
    bio: 'Nhà cách mạng, nhà lý luận mác-xít kiệt xuất, người lãnh đạo Cách mạng Tháng Mười Nga vĩ đại năm 1917.',
    quote: '"Vật chất là một phạm trù triết học dùng để chỉ thực tại khách quan được đem lại cho con người trong cảm giác."',
    milestones: [
      { year: '1870', desc: 'Sinh tại Simbirsk, Đế quốc Nga' },
      { year: '1908', desc: 'Xuất bản Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán' },
      { year: '1914', desc: 'Soạn thảo Bút ký triết học' },
      { year: '1917', desc: 'Lãnh đạo thành công Cách mạng Tháng Mười Nga' },
      { year: '1924', desc: 'Qua đời tại Gorki, Liên Xô' }
    ],
    contribution: 'Bảo vệ và phát triển chủ nghĩa duy vật trước cuộc khủng hoảng vật lý học đầu thế kỷ XX, đưa ra định nghĩa kinh điển về phạm trù vật chất.',
    image: '/assets/lenin.png',
    archiveLabel: 'Hồ sơ bảo vệ & phát triển định nghĩa vật chất'
  }
};

export const CORE_THEORY_CARDS = [
  {
    title: 'Hoàn cảnh quyết định suy nghĩ',
    sub: 'Vật chất quyết định Ý thức',
    content: 'Thiết bị tốt, Wifi mạnh giúp tiếp cận tri thức nhanh chóng; ngược lại, áp lực tài chính và thiếu hụt thiết bị dễ gieo rắc tâm lý chán nản, kiệt sức.'
  },
  {
    title: 'Suy nghĩ có tính chủ động riêng',
    sub: 'Tính độc lập tương đối',
    content: 'Môi trường tác động nhưng không ấn định máy móc suy nghĩ của con người. Cùng một hoàn cảnh hay công cụ, mỗi sinh viên sẽ có cách phản ứng hoàn toàn khác nhau.'
  },
  {
    title: 'Dùng hành động thay đổi hoàn cảnh',
    sub: 'Hoạt động thực tiễn cải tạo',
    content: 'Khi nhận ra điểm hạn chế của môi trường (như chỗ ở ồn ào), sinh viên có thể chủ động chuyển sang thư viện học để tối ưu hóa điều kiện sống.'
  },
  {
    title: 'Bài học nguyên tắc',
    sub: 'Tôn trọng khách quan, phát huy chủ quan',
    content: 'Cần tôn trọng điều kiện thực tế nhưng phải luôn phát huy tính năng động chủ quan, tránh tâm lý đổ lỗi cho hoàn cảnh hoặc ảo tưởng duy ý chí.'
  }
];

export const HISTORY_MILESTONES = [
  {
    era: 'Cách mạng Công nghiệp',
    condition: 'Máy hơi nước, nhà máy, đô thị hóa.',
    mindset: 'Chuyển từ học nghề cá thể sang hệ thống trường học đại chúng.'
  },
  {
    era: 'Cách mạng Tháng Mười (1917)',
    condition: 'Xóa bỏ chế độ áp bức, thay đổi quan hệ sản xuất.',
    mindset: 'Quần chúng công nông được tiếp cận giáo dục bình đẳng.'
  },
  {
    era: 'Máy tính & Internet',
    condition: 'Máy tính cá nhân, mạng toàn cầu, smartphone.',
    mindset: 'Tri thức mở rộng; người học chuyển từ thụ động sang tự tra cứu.'
  },
  {
    era: 'Đại dịch COVID-19',
    condition: 'Giãn cách xã hội, bắt buộc học trực tuyến.',
    mindset: 'Đòi hỏi cao về tính tự giác, kỷ luật và năng lực công nghệ.'
  },
  {
    era: 'Kỷ nguyên AI',
    condition: 'Trợ lý AI (ChatGPT, Gemini) tự động hóa tri thức.',
    mindset: 'Học thuộc lòng mất giá trị; tư duy phản biện trở thành cốt lõi.'
  }
];

export const REFERENCES_DATA = [
  {
    id: '01',
    title: 'Bộ Giáo dục và Đào tạo. Giáo trình Triết học Mác – Lênin.',
    publisher: 'Nhà xuất bản Chính trị Quốc gia Sự thật.',
    tag: 'Giáo Trình Chuẩn'
  },
  {
    id: '02',
    title: 'OECD. (2024). Students, Digital Devices and Success.',
    publisher: 'OECD Education Policy Perspectives, No. 102. OECD Publications.',
    tag: 'Báo Cáo Toàn Cầu'
  },
  {
    id: '03',
    title: '[1] Lời tựa Góp phần phê phán Kinh tế chính trị học (1859).',
    publisher: 'Tác phẩm kinh điển của K.Marx về mối quan hệ biện chứng giữa hạ tầng cơ sở và thượng tầng kiến trúc.'
  },
  {
    id: '04',
    title: '[2] Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán (1908).',
    publisher: 'V.I.Lenin bảo vệ và phát triển thế giới quan duy vật khoa học trước các biến động lịch sử.'
  },
  {
    id: '05',
    title: 'STUDENT PART-TIME EMPLOYMENT CASE STUDY AT TON DUC THANG UNIVERSITY IN VIETNAM',
    publisher: 'Nghiên cứu thực tiễn về ảnh hưởng của việc làm thêm đối với kết quả học tập của sinh viên.',
    link: 'https://www.researchgate.net/publication/310843746_STUDENT_PART-TIME_EMPLOYMENT'
  },
  {
    id: '06',
    title: 'ScienceDirect: Family & Peer Support for First-Year Students',
    publisher: 'Nghiên cứu về vai trò bệ đỡ tinh thần từ gia đình và bạn bè đối với sự thích ứng học tập năm nhất.',
    link: 'https://www.sciencedirect.com/science/article/abs/pii/S2050700321000358'
  },
  {
    id: '07',
    title: 'Conscientia Beam: 5 Groups of Factors Influencing Academic Performance',
    publisher: 'Phân tích 5 nhóm yếu tố tác động trực tiếp và gián tiếp tới năng lực tiếp thu của người học.',
    link: 'https://archive.conscientia-beam.com/index.php/61/article/view/636'
  },
  {
    id: '08',
    title: 'Taylor & Francis: Impact of Social Media on Students (Hanoi & HCMC)',
    publisher: 'Khảo sát tác động hai chiều của mạng xã hội và hội chứng tâm lý FOMO lên hành vi sinh viên.',
    link: 'https://www.tandfonline.com/doi/full/10.1080/00673843.2025.2608766'
  },
  {
    id: '09',
    title: 'Hoạt động hướng dẫn ứng dụng công cụ AI cho tân sinh viên',
    publisher: 'Tài liệu phương pháp luận thực tiễn của Trường Đại học FPT về việc làm chủ AI trong học tập.'
  }
];

export const RESEARCH_TOOLS = [
  {
    name: 'Consensus',
    role: 'Kiểm chứng học thuật',
    desc: 'Hỗ trợ kiểm tra và đối chiếu chất lượng thông tin đầu vào từ các bài báo khoa học đã qua bình duyệt (peer-reviewed).'
  },
  {
    name: 'ChatGPT',
    role: 'Trợ lý ý tưởng',
    desc: 'Công cụ tìm ý tưởng, hệ thống hóa nội dung bài học và tối ưu hóa diễn đạt. Cần đối chiếu độc lập với nguồn tri thức chính thống.'
  },
  {
    name: 'Google Scholar',
    role: 'Tra cứu nguồn',
    desc: 'Cơ sở dữ liệu khổng lồ phục vụ tra cứu nhanh các công trình nghiên cứu, luận văn và tài liệu học thuật chuyên sâu toàn cầu.'
  },
  {
    name: 'Canva & PowerPoint',
    role: 'Trực quan hóa',
    desc: 'Nền tảng thiết kế trực quan, hỗ trợ trình bày kết quả phân tích số liệu và báo cáo nghiên cứu khoa học một cách chuyên nghiệp.'
  }
];
