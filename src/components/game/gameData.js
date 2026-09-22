/**
 * CAMIND MINI-GAME DATA
 * Bám sát tài liệu thiết kế "(MLN111) SE1915 SP sáng tạo.md"
 * Bản đồ 32 ô Zigzag 4 hàng × 8 ô trên kích thước 1672 x 941
 */

export const BOARD_COLS = [9.87, 21.29, 32.72, 44.14, 55.56, 66.99, 78.41, 90.01]
export const BOARD_ROWS = [25.50, 41.98, 72.26, 88.74]

export const DICE_POSITION = {
  x: 50.0,
  y: 53.5
}

export const QUESTIONS = {
  q01: {
    id: 'q01',
    type: 'normal',
    cellNumber: 2,
    cellName: 'Phòng trọ ồn',
    title: 'Phòng trọ ồn ào',
    question: 'Phòng trọ thường xuyên ồn khiến bạn khó tập trung và dần ngại học. Bạn chưa đủ tiền chuyển trọ, nhưng thư viện trường miễn phí và thuận tiện đi lại. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Giữ nguyên chỗ học, chỉ tăng thời gian ngồi vào bàn.' },
      { key: 'B', text: 'Chuyển giờ tự học sang thư viện và sắp xếp lịch phù hợp.' },
      { key: 'C', text: 'Tạm giảm việc học, chờ có điều kiện chuyển trọ.' },
      { key: 'D', text: 'Mua thêm tài liệu để tạo hứng thú dù chỗ học vẫn ồn.' }
    ],
    correctAnswer: 'B',
    topic: 'Vật chất và ý thức',
    explanation: 'Không gian học ảnh hưởng đến sự tập trung và thái độ. Nhận ra khó khăn rồi chủ động sử dụng thư viện là biến nhận thức thành hành động cải thiện điều kiện học.'
  },
  q02: {
    id: 'q02',
    type: 'normal',
    cellNumber: 4,
    cellName: 'Làm thêm',
    title: 'Làm thêm và trễ bài',
    question: 'Từ khi nhận thêm ca tối, bạn thường mệt và nộp bài muộn. Bạn vẫn cần thu nhập, nhưng có thể trao đổi để đổi ca. Cách xử lý nào phù hợp nhất?',
    options: [
      { key: 'A', text: 'Giữ nguyên ca làm, dành thời gian nghỉ để hoàn thành bài.' },
      { key: 'B', text: 'Mua ứng dụng nhắc việc, giữ nguyên lịch làm và lịch học.' },
      { key: 'C', text: 'Xin gia hạn mọi bài tập, tiếp tục nhận số ca hiện tại.' },
      { key: 'D', text: 'Điều chỉnh ca làm và dành khung giờ cố định cho bài tập.' }
    ],
    correctAnswer: 'D',
    topic: 'Nguyên nhân và kết quả',
    explanation: 'Muốn khắc phục việc trễ bài cần tác động vào nguyên nhân: lịch làm đang thu hẹp thời gian và sức lực dành cho học tập. Giải pháp cũng phải tính đến nhu cầu thu nhập thực tế.'
  },
  q03: {
    id: 'q03',
    type: 'normal',
    cellNumber: 5,
    cellName: 'Laptop mới',
    title: 'Có laptop mới là học tốt?',
    question: 'Bạn vừa được hỗ trợ laptop phù hợp với ngành học. Tuy nhiên, phần lớn thời gian sử dụng máy vẫn dành cho giải trí. Bạn nên làm gì để thiết bị giúp cải thiện việc học?',
    options: [
      { key: 'A', text: 'Đặt lịch thực hành và hoàn thành nhiệm vụ học cụ thể trên máy.' },
      { key: 'B', text: 'Cài thêm nhiều phần mềm, đợi khi cần mới bắt đầu sử dụng.' },
      { key: 'C', text: 'Nâng cấp phụ kiện trước để có đủ cảm hứng học tập.' },
      { key: 'D', text: 'Tải thật nhiều tài liệu, để việc thực hành sang cuối kỳ.' }
    ],
    correctAnswer: 'A',
    topic: 'Khả năng và hiện thực',
    explanation: 'Laptop tạo điều kiện và mở ra khả năng học tốt hơn. Muốn biến khả năng ấy thành kết quả thực tế, sinh viên cần sử dụng thiết bị vào hoạt động học tập cụ thể.'
  },
  q04: {
    id: 'q04',
    type: 'normal',
    cellNumber: 8,
    cellName: 'Thông báo',
    title: 'Thông báo liên tục',
    question: 'Bạn cần mạng xã hội để nhận thông báo lớp, nhưng thường chuyển sang xem video mỗi khi điện thoại báo tin. Bài tập vì vậy bị kéo dài. Bạn nên chọn cách nào?',
    options: [
      { key: 'A', text: 'Trả lời ngay mọi thông báo để tránh nghĩ đến chúng.' },
      { key: 'B', text: 'Giữ nguyên cách dùng, tăng thêm thời gian ngồi học.' },
      { key: 'C', text: 'Tắt thông báo giải trí và kiểm tra nhóm lớp theo khung giờ.' },
      { key: 'D', text: 'Rời toàn bộ nhóm lớp để tránh bị điện thoại làm phiền.' }
    ],
    correctAnswer: 'C',
    topic: 'Quan điểm toàn diện',
    explanation: 'Mạng xã hội vừa hỗ trợ trao đổi học tập, vừa có thể gây xao nhãng. Cần giữ chức năng hữu ích và điều chỉnh yếu tố gây mất tập trung, thay vì chỉ nhìn một mặt.'
  },
  q05: {
    id: 'q05',
    type: 'normal',
    cellNumber: 9,
    cellName: 'Phân công nhóm',
    title: 'Có nên sao chép cách làm của nhóm giỏi?',
    question: 'Bạn tham khảo một nhóm có kinh nghiệm làm website: người phụ trách FE – giao diện người dùng, người phụ trách BE – xử lý yêu cầu và dữ liệu phía sau. Nhóm bạn ít người hơn, mới học lập trình và còn phải đi làm thêm. Bạn nên áp dụng kinh nghiệm ấy thế nào?',
    options: [
      { key: 'A', text: 'Giữ nguyên tắc phân công rõ ràng, điều chỉnh nhiệm vụ theo năng lực và thời gian.' },
      { key: 'B', text: 'Chia vai trò và đặt tiến độ giống hệt nhóm kia để đạt kết quả tương tự.' },
      { key: 'C', text: 'Bỏ cách phân công đó vì nhóm mới học không thể áp dụng kinh nghiệm của nhóm giỏi.' },
      { key: 'D', text: 'Để mỗi người làm phần mình thích, gần ngày nộp mới ghép các phần lại.' }
    ],
    correctAnswer: 'A',
    topic: 'Cái chung và cái riêng',
    explanation: 'Phân công rõ ràng và phối hợp giữa các phần là kinh nghiệm có thể học hỏi. Tuy nhiên, nhiệm vụ và tiến độ phải phù hợp với số người, năng lực và thời gian thực tế của từng nhóm, tránh sao chép máy móc.'
  },
  q06: {
    id: 'q06',
    type: 'normal',
    cellNumber: 11,
    cellName: 'Internet',
    title: 'Internet không ổn định',
    question: 'Mạng ở trọ thường bị gián đoạn vào buổi tối, khiến bạn bỏ dở bài giảng và dần chán học trực tuyến. Bạn có thể dùng Wi-Fi trường vào ban ngày. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Tiếp tục xem trực tiếp vào giờ cũ, chờ mạng tự ổn định.' },
      { key: 'B', text: 'Chỉ học những đoạn tải được, bỏ qua phần bị gián đoạn.' },
      { key: 'C', text: 'Nhờ bạn tóm tắt toàn bộ để không cần xem bài giảng.' },
      { key: 'D', text: 'Tải tài liệu được phép tải trước và chuẩn bị phần học ngoại tuyến.' }
    ],
    correctAnswer: 'D',
    topic: 'Tôn trọng khách quan, phát huy tính chủ động',
    explanation: 'Cần thừa nhận giới hạn của đường truyền và tổ chức việc học phù hợp. Sự chủ động thể hiện ở phương án khả thi, không chỉ ở quyết tâm.'
  },
  lec01: {
    id: 'lec01',
    type: 'lecturer',
    cellNumber: 12,
    cellName: 'Gặp giảng viên',
    title: 'Có phòng máy nhưng website vẫn không chạy đúng',
    subtitle: 'Ô kiểm tra của Giảng viên - Sai sẽ kết thúc ván chơi ngay!',
    question: 'Trường có phòng máy đủ phục vụ việc học, nhưng giờ mở cửa trùng với ca làm thêm của nhiều sinh viên. Trong dự án website, nhóm FE làm màn hình đăng ký, nhóm BE làm phần lưu thông tin. Hai bên ít trao đổi, thường chép mã AI nên khi ghép lại, bấm “Đăng ký” vẫn không lưu được dữ liệu.\nTrường có thể điều chỉnh giờ mở cửa nhưng chưa có ngân sách mua thêm máy. Phương án nào phù hợp nhất để cải thiện cả điều kiện học và cách học của nhóm?',
    options: [
      { key: 'A', text: 'Đổi giờ phòng máy và giữ nguyên cách làm; khi có đủ thời gian sử dụng máy, các thành viên sẽ tự hiểu cách kết nối.' },
      { key: 'B', text: 'Giữ giờ phòng máy, yêu cầu FE và BE làm riêng thật hoàn chỉnh; mỗi phần tốt thì khi ghép sẽ tự hoạt động tốt.' },
      { key: 'C', text: 'Đổi giờ phòng máy, giao bạn giỏi sửa toàn bộ phần kết nối; các thành viên còn lại học thuộc báo cáo để kịp nộp.' },
      { key: 'D', text: 'Đổi giờ phù hợp, cho FE–BE thống nhất thông tin gửi–nhận, cùng chạy thử và giải thích từng bước của chức năng.' }
    ],
    correctAnswer: 'D',
    topic: 'Vật chất & ý thức; Nguyên nhân & kết quả; Quan điểm toàn diện',
    explanation: 'Khó khăn xuất phát từ cả điều kiện tiếp cận phòng máy, sự phối hợp và cách học phụ thuộc. Đáp án D xử lý đồng thời các yếu tố đó. Đáp án A cho rằng chỉ cần cải thiện điều kiện sẽ tự tạo ra hiểu biết; B xem các bộ phận tách rời; C giải quyết việc nộp bài nhưng duy trì sự phụ thuộc.'
  },
  q07: {
    id: 'q07',
    type: 'normal',
    cellNumber: 15,
    cellName: 'Gia đình',
    title: 'Kỳ vọng từ gia đình',
    question: 'Gia đình muốn bạn đạt điểm cao ở tất cả các môn. Bạn bắt đầu học đối phó để tránh bị trách, trong khi đang yếu một môn nền tảng. Bạn nên xử lý thế nào?',
    options: [
      { key: 'A', text: 'Chỉ chọn nhiệm vụ dễ lấy điểm để gia đình yên tâm.' },
      { key: 'B', text: 'Trao đổi khó khăn và thống nhất mục tiêu cải thiện từng bước.' },
      { key: 'C', text: 'Giấu kết quả học tập cho đến khi mọi môn đều tốt.' },
      { key: 'D', text: 'Làm theo mọi kỳ vọng, dù lịch học đã vượt khả năng.' }
    ],
    correctAnswer: 'B',
    topic: 'Mối liên hệ và điều kiện cụ thể',
    explanation: 'Thái độ học tập có liên hệ với kỳ vọng gia đình và năng lực hiện tại. Trao đổi để điều chỉnh mục tiêu giúp thay đổi môi trường hỗ trợ, đồng thời giữ trách nhiệm với việc học.'
  },
  q08: {
    id: 'q08',
    type: 'normal',
    cellNumber: 17,
    cellName: 'Cùng học code',
    title: 'Một người code, cả nhóm phụ thuộc',
    question: 'Nhóm bạn làm website đăng ký câu lạc bộ. Một bạn thường code cả giao diện FE và phần BE tiếp nhận, lưu thông tin. Các thành viên còn lại chỉ thay màu và chép báo cáo. Nhóm nộp bài đúng hạn nhưng ngày càng phụ thuộc vào một người. Bạn nên đề xuất điều gì?',
    options: [
      { key: 'A', text: 'Tiếp tục để bạn giỏi code hết, các thành viên còn lại tập trung trang trí.' },
      { key: 'B', text: 'Để bạn giỏi trình bày một lần, những người còn lại học thuộc phần giải thích.' },
      { key: 'C', text: 'Chia nhiệm vụ vừa sức, mỗi người tự làm và giải thích cách phần mình kết nối với nhóm.' },
      { key: 'D', text: 'Dùng lại mã của nhóm trước để mọi người chỉ cần thay nội dung và hình ảnh.' }
    ],
    correctAnswer: 'C',
    topic: 'Ý thức tác động trở lại thông qua hoạt động',
    explanation: 'Nhận ra sự phụ thuộc cần dẫn đến thay đổi cách tổ chức nhóm. Phân công phù hợp và trao đổi cách kết nối FE–BE giúp môi trường bạn bè trở thành nơi cùng học, thay vì chỉ cùng nhận điểm.'
  },
  q09: {
    id: 'q09',
    type: 'normal',
    cellNumber: 19,
    cellName: 'Kiểm chứng AI',
    title: 'AI nói đúng, có cần kiểm tra?',
    question: 'AI cung cấp đoạn mã cho bài thực hành và khẳng định mã chạy đúng. Bạn chưa hiểu cách hoạt động. Trước khi sử dụng, bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Dựa vào lời giải thích trôi chảy để đánh giá độ chính xác.' },
      { key: 'B', text: 'Hỏi lại cùng một câu đến khi AI đưa câu trả lời nhất quán.' },
      { key: 'C', text: 'So sánh độ dài đoạn mã với bài của bạn cùng lớp.' },
      { key: 'D', text: 'Đọc hiểu mã, chạy các trường hợp kiểm thử và đối chiếu yêu cầu.' }
    ],
    correctAnswer: 'D',
    topic: 'Thực tiễn kiểm tra nhận thức',
    explanation: 'Lời khẳng định của công cụ cần được kiểm tra bằng hoạt động thử nghiệm và kết quả thực hiện. Bài giảng nhấn mạnh vai trò kiểm nghiệm, bổ sung và điều chỉnh nhận thức của thực tiễn.'
  },
  q10: {
    id: 'q10',
    type: 'normal',
    cellNumber: 22,
    cellName: 'Học hiểu code',
    title: 'Code đúng mẫu là đã hiểu bài?',
    question: 'Bạn chỉ luyện một mẫu code đăng ký tài khoản. Trong buổi kiểm tra, giảng viên tình cờ yêu cầu đúng mẫu đó nên bạn đạt điểm cao. Tuy nhiên, bạn chưa biết xử lý khi người dùng bỏ trống thông tin hoặc nhập sai. Với dự án tiếp theo, bạn nên học thế nào?',
    options: [
      { key: 'A', text: 'Học rõ luồng gửi–nhận dữ liệu và luyện thêm các trường hợp đúng, sai, thiếu thông tin.' },
      { key: 'B', text: 'Tiếp tục học đúng mẫu cũ vì điểm cao đã chứng minh cách học này hiệu quả.' },
      { key: 'C', text: 'Chỉ bổ sung giao diện đẹp hơn, giữ nguyên phần xử lý mà mình chưa hiểu.' },
      { key: 'D', text: 'Học thuộc thêm vài mẫu có sẵn để tăng khả năng gặp đúng đề kiểm tra.' }
    ],
    correctAnswer: 'A',
    topic: 'Tất nhiên và ngẫu nhiên',
    explanation: 'Gặp đúng mẫu đã luyện có yếu tố ngẫu nhiên, chưa chứng minh bạn hiểu cách hệ thống hoạt động. Cần xây dựng năng lực bằng việc hiểu và vận dụng, thay vì dựa vào khả năng “trúng mẫu”.'
  },
  lec02: {
    id: 'lec02',
    type: 'lecturer',
    cellNumber: 23,
    cellName: 'Gặp giảng viên',
    title: 'Nhóm điểm cao có cách học tốt hơn?',
    subtitle: 'Ô kiểm tra của Giảng viên - Sai sẽ kết thúc ván chơi ngay!',
    question: 'Nhóm A chỉ luyện một mẫu website có sẵn, chưa hiểu rõ luồng FE gửi thông tin cho BE. Hôm chấm bài, giảng viên tình cờ thử đúng trường hợp mẫu nên nhóm đạt điểm cao.\nNhóm B học có hệ thống, giải thích được luồng hoạt động và đã thử nhiều tình huống. Tuy nhiên, hôm trình bày xảy ra sự cố mạng khiến FE không gửi được thông tin đến BE, nên nhóm bị điểm thấp hơn. Một số bạn muốn bỏ cách học của nhóm B để chuyển sang học thuộc mẫu.\nBạn nên đề xuất cách quyết định nào?',
    options: [
      { key: 'A', text: 'Chọn cách của nhóm A vì điểm cao hơn đã đủ chứng minh học thuộc mẫu hiệu quả hơn học hiểu.' },
      { key: 'B', text: 'Giữ cách của nhóm B nhưng không cần chuẩn bị mạng dự phòng vì người hiểu bài sẽ không bị điều kiện bên ngoài ảnh hưởng.' },
      { key: 'C', text: 'Đánh giá qua nhiều lần thực hành, duy trì học hiểu luồng hoạt động và chuẩn bị phương án xử lý sự cố khi trình bày.' },
      { key: 'D', text: 'Chờ thêm một lần chấm rồi chọn cách của nhóm có điểm cao hơn, không cần xem khả năng giải thích và sửa lỗi.' }
    ],
    correctAnswer: 'C',
    topic: 'Tất nhiên & ngẫu nhiên; Bản chất & hiện tượng',
    explanation: 'Điểm của một lần trình bày có thể chịu ảnh hưởng từ việc gặp đúng mẫu hoặc sự cố mạng. Cần xem khả năng giải thích, vận dụng và sửa lỗi qua nhiều nhiệm vụ để đánh giá năng lực. Đồng thời, hiểu bài không thay thế việc chuẩn bị điều kiện kỹ thuật.'
  },
  q11: {
    id: 'q11',
    type: 'normal',
    cellNumber: 25,
    cellName: 'Luồng FE-BE',
    title: 'Giao diện chạy đẹp, mình đã hiểu hệ thống?',
    question: 'Website của nhóm được điểm cao. Bạn chỉ làm màu sắc và các nút trên giao diện FE, chưa hiểu thông tin được gửi đến BE và lưu lại thế nào. Để đánh giá năng lực của mình trước dự án mới, bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Dựa vào điểm nhóm để xác nhận mình đã hiểu toàn bộ cách website hoạt động.' },
      { key: 'B', text: 'Học thuộc các câu giải thích của bạn phụ trách BE để trả lời khi được hỏi.' },
      { key: 'C', text: 'Tự giải thích luồng nhập–gửi–lưu–hiển thị, rồi thử sửa một chức năng nhỏ.' },
      { key: 'D', text: 'Đếm số dòng code và số màn hình mình làm để xác định mức độ hiểu bài.' }
    ],
    correctAnswer: 'C',
    topic: 'Bản chất và hiện tượng',
    explanation: 'Điểm số và giao diện đẹp là những biểu hiện bên ngoài, chưa đủ phản ánh mức độ hiểu hệ thống của từng người. Khả năng giải thích luồng hoạt động và tự vận dụng giúp đánh giá năng lực thực chất hơn.'
  },
  q12: {
    id: 'q12',
    type: 'normal',
    cellNumber: 28,
    cellName: 'Nội dung slide',
    title: 'Slide đẹp nhưng thiếu lập luận',
    question: 'Nhóm đang làm bài về ảnh hưởng của môi trường đến việc học. Slide đẹp nhưng phần phân tích thiếu dẫn chứng; thời gian còn lại có hạn. Nhóm nên ưu tiên điều gì?',
    options: [
      { key: 'A', text: 'Thêm hiệu ứng để người nghe chú ý hơn vào bài trình bày.' },
      { key: 'B', text: 'Bổ sung lập luận, dẫn chứng và chỉnh bố cục để làm rõ nội dung.' },
      { key: 'C', text: 'Giữ nguyên nội dung, tập nói tự tin để tăng sức thuyết phục.' },
      { key: 'D', text: 'Bỏ toàn bộ hình ảnh, chuyển mọi nội dung thành đoạn văn dài.' }
    ],
    correctAnswer: 'B',
    topic: 'Nội dung và hình thức',
    explanation: 'Nội dung giữ vai trò quyết định, còn hình thức phù hợp giúp truyền đạt hiệu quả. Cần hoàn thiện lập luận và tổ chức cách trình bày hỗ trợ lập luận đó.'
  },
  q13: {
    id: 'q13',
    type: 'normal',
    cellNumber: 30,
    cellName: 'Kết nối FE-BE',
    title: 'Hai buổi vẫn chưa kết nối được FE-BE',
    question: 'Bạn được sử dụng phòng máy của trường. Sau hai buổi thực hành, bạn vẫn chưa làm được chức năng “bấm Đăng ký trên giao diện → thông tin được xử lý và lưu lại”. Bạn bắt đầu nghĩ mình không hợp ngành kỹ thuật. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Thực hành đều từng phần nhỏ, sửa lỗi rồi ghép thành chức năng hoàn chỉnh.' },
      { key: 'B', text: 'Chuyển ngay sang làm một website lớn để tạo bước tiến nhanh hơn.' },
      { key: 'C', text: 'Chỉ xem video hướng dẫn đến khi tự tin, chưa cần trực tiếp viết code.' },
      { key: 'D', text: 'Đợi có máy tính mạnh hơn rồi mới tiếp tục học cách kết nối hai phần.' }
    ],
    correctAnswer: 'A',
    topic: 'Lượng và chất',
    explanation: 'Năng lực kết nối FE–BE được hình thành qua quá trình tích lũy kiến thức, thực hành và sửa lỗi phù hợp. Hai buổi chưa làm được không đủ để kết luận về khả năng; cần tích lũy có phương pháp để tạo chuyển biến về năng lực.'
  }
}

/**
 * 32 ô lộ trình Zigzag (4 hàng × 8 cột)
 */
export const BOARD_CELLS = [
  // Hàng 1 (1 -> 8): Trái sang Phải
  {
    id: 1,
    name: 'Xuất phát',
    type: 'start',
    x: BOARD_COLS[0],
    y: BOARD_ROWS[0],
    title: 'Điểm Xuất Phát',
    desc: 'Hành trình học tập và rèn luyện bắt đầu tại đây!'
  },
  {
    id: 2,
    name: 'Phòng trọ ồn',
    type: 'question',
    questionId: 'q01',
    x: BOARD_COLS[1],
    y: BOARD_ROWS[0],
    title: 'Phòng trọ ồn ào',
    desc: 'Tình huống học tập: Đối mặt với không gian trọ ồn ào.'
  },
  {
    id: 3,
    name: 'Uống nước',
    type: 'rest',
    x: BOARD_COLS[2],
    y: BOARD_ROWS[0],
    title: 'Uống nước',
    desc: 'Cung cấp đủ nước giúp não bộ tỉnh táo, sẵn sàng tiếp thu bài học mới.'
  },
  {
    id: 4,
    name: 'Làm thêm',
    type: 'question',
    questionId: 'q02',
    x: BOARD_COLS[3],
    y: BOARD_ROWS[0],
    title: 'Làm thêm và trễ bài',
    desc: 'Tình huống học tập: Cân đối giữa công việc làm thêm và deadline bài tập.'
  },
  {
    id: 5,
    name: 'Laptop mới',
    type: 'question',
    questionId: 'q03',
    x: BOARD_COLS[4],
    y: BOARD_ROWS[0],
    title: 'Có laptop mới là học tốt?',
    desc: 'Tình huống học tập: Khả năng và hiện thực trong việc dùng thiết bị công nghệ.'
  },
  {
    id: 6,
    name: 'Gieo thêm',
    type: 'extra_roll',
    x: BOARD_COLS[5],
    y: BOARD_ROWS[0],
    title: 'Gieo thêm xúc xắc',
    desc: 'May mắn mỉm cười! Bạn được thưởng thêm 1 lượt gieo xúc xắc và tiến bước tiếp!'
  },
  {
    id: 7,
    name: 'Ăn nhẹ',
    type: 'rest',
    x: BOARD_COLS[6],
    y: BOARD_ROWS[0],
    title: 'Ăn nhẹ nạp năng lượng',
    desc: 'Bổ sung một bữa ăn nhẹ lành mạnh để giữ thể lực tốt trong suốt kỳ học.'
  },
  {
    id: 8,
    name: 'Thông báo',
    type: 'question',
    questionId: 'q04',
    x: BOARD_COLS[7],
    y: BOARD_ROWS[0],
    title: 'Thông báo liên tục',
    desc: 'Tình huống học tập: Làm chủ sự chú ý trước cám dỗ mạng xã hội.'
  },

  // Hàng 2 (9 -> 16): Phải sang Trái
  {
    id: 9,
    name: 'Phân công nhóm',
    type: 'question',
    questionId: 'q05',
    x: BOARD_COLS[7],
    y: BOARD_ROWS[1],
    title: 'Có nên sao chép cách làm của nhóm giỏi?',
    desc: 'Tình huống học tập: Vận dụng cái chung và cái riêng trong làm việc nhóm.'
  },
  {
    id: 10,
    name: 'Nghe nhạc',
    type: 'rest',
    x: BOARD_COLS[6],
    y: BOARD_ROWS[1],
    title: 'Nghe nhạc thư giãn',
    desc: 'Một bản nhạc du dương giúp giải tỏa âu lo và thư giãn tinh thần.'
  },
  {
    id: 11,
    name: 'Internet',
    type: 'question',
    questionId: 'q06',
    x: BOARD_COLS[5],
    y: BOARD_ROWS[1],
    title: 'Internet không ổn định',
    desc: 'Tình huống học tập: Tính khách quan và tính chủ động khi gặp sự cố mạng.'
  },
  {
    id: 12,
    name: 'Gặp giảng viên',
    type: 'lecturer',
    questionId: 'lec01',
    x: BOARD_COLS[4],
    y: BOARD_ROWS[1],
    title: 'Kiểm tra với Giảng viên',
    desc: 'Thử thách đặc biệt! Trả lời đúng để đi tiếp; sai sẽ kết thúc ván chơi ngay lập tức!'
  },
  {
    id: 13,
    name: 'Lùi bước',
    type: 'step_back',
    x: BOARD_COLS[3],
    y: BOARD_ROWS[1],
    title: 'Lùi bước điều chỉnh',
    desc: 'Gieo xúc xắc lùi từ 1 đến 6 bước để rà soát lại phương pháp học.'
  },
  {
    id: 14,
    name: 'Đi dạo',
    type: 'rest',
    x: BOARD_COLS[2],
    y: BOARD_ROWS[1],
    title: 'Đi dạo khuôn viên',
    desc: 'Tản bộ vài phút quanh sân trường rợp bóng mát để hít thở không khí trong lành.'
  },
  {
    id: 15,
    name: 'Gia đình',
    type: 'question',
    questionId: 'q07',
    x: BOARD_COLS[1],
    y: BOARD_ROWS[1],
    title: 'Kỳ vọng từ gia đình',
    desc: 'Tình huống học tập: Ứng xử trước kỳ vọng điểm số từ người thân.'
  },
  {
    id: 16,
    name: 'Học lại',
    type: 'restart',
    x: BOARD_COLS[0],
    y: BOARD_ROWS[1],
    title: 'Học lại củng cố',
    desc: 'Cần củng cố lại kiến thức căn bản: Quay về Ô 1 (Xuất phát), không trừ mạng!'
  },

  // Hàng 3 (17 -> 24): Trái sang Phải
  {
    id: 17,
    name: 'Cùng học code',
    type: 'question',
    questionId: 'q08',
    x: BOARD_COLS[0],
    y: BOARD_ROWS[2],
    title: 'Một người code, cả nhóm phụ thuộc',
    desc: 'Tình huống học tập: Tinh thần chủ động và phân công công việc công bằng.'
  },
  {
    id: 18,
    name: 'Giãn cơ',
    type: 'rest',
    x: BOARD_COLS[1],
    y: BOARD_ROWS[2],
    title: 'Giãn cơ thể',
    desc: 'Thực hiện vài động tác giãn cơ để đánh tan mệt mỏi sau giờ thực hành máy tính.'
  },
  {
    id: 19,
    name: 'Kiểm chứng AI',
    type: 'question',
    questionId: 'q09',
    x: BOARD_COLS[2],
    y: BOARD_ROWS[2],
    title: 'AI nói đúng, có cần kiểm tra?',
    desc: 'Tình huống học tập: Thực tiễn là tiêu chuẩn kiểm nghiệm nhận thức.'
  },
  {
    id: 20,
    name: 'Gieo thêm',
    type: 'extra_roll',
    x: BOARD_COLS[3],
    y: BOARD_ROWS[2],
    title: 'Gieo thêm xúc xắc',
    desc: 'Nỗ lực được đền đáp! Bạn được gieo xúc xắc thêm 1 lần và bứt phá về đích!'
  },
  {
    id: 21,
    name: 'Ngắm cây',
    type: 'rest',
    x: BOARD_COLS[4],
    y: BOARD_ROWS[2],
    title: 'Ngắm cây xanh',
    desc: 'Tận hưởng sắc xanh của cây cỏ giúp làm dịu đôi mắt và tâm trí.'
  },
  {
    id: 22,
    name: 'Học hiểu code',
    type: 'question',
    questionId: 'q10',
    x: BOARD_COLS[5],
    y: BOARD_ROWS[2],
    title: 'Code đúng mẫu là đã hiểu bài?',
    desc: 'Tình huống học tập: Phân biệt giữa cái tất nhiên và cái ngẫu nhiên trong học tập.'
  },
  {
    id: 23,
    name: 'Gặp giảng viên',
    type: 'lecturer',
    questionId: 'lec02',
    x: BOARD_COLS[6],
    y: BOARD_ROWS[2],
    title: 'Kiểm tra với Giảng viên',
    desc: 'Thử thách chuyên sâu cuối môn! Đúng để bước vào chặng cuối; sai sẽ kết thúc ván chơi!'
  },
  {
    id: 24,
    name: 'Trò chuyện',
    type: 'rest',
    x: BOARD_COLS[7],
    y: BOARD_ROWS[2],
    title: 'Trò chuyện cùng bạn bè',
    desc: 'Giao lưu gắn kết cùng bè bạn tiếp thêm động lực học tập mỗi ngày.'
  },

  // Hàng 4 (25 -> 32): Phải sang Trái
  {
    id: 25,
    name: 'Luồng FE-BE',
    type: 'question',
    questionId: 'q11',
    x: BOARD_COLS[7],
    y: BOARD_ROWS[3],
    title: 'Giao diện chạy đẹp, mình đã hiểu hệ thống?',
    desc: 'Tình huống học tập: Đánh giá năng lực thực chất qua bản chất và hiện tượng.'
  },
  {
    id: 26,
    name: 'Lùi bước',
    type: 'step_back',
    x: BOARD_COLS[6],
    y: BOARD_ROWS[3],
    title: 'Lùi bước điều chỉnh',
    desc: 'Gieo xúc xắc lùi từ 1 đến 6 bước để củng cố lại nền tảng kiến thức.'
  },
  {
    id: 27,
    name: 'Hít thở',
    type: 'rest',
    x: BOARD_COLS[5],
    y: BOARD_ROWS[3],
    title: 'Hít thở sâu',
    desc: 'Hít vào thật sâu, thở ra nhẹ nhàng để tái tạo sự bình tĩnh và minh mẫn.'
  },
  {
    id: 28,
    name: 'Nội dung slide',
    type: 'question',
    questionId: 'q12',
    x: BOARD_COLS[4],
    y: BOARD_ROWS[3],
    title: 'Slide đẹp nhưng thiếu lập luận',
    desc: 'Tình huống học tập: Mối quan hệ giữa nội dung và hình thức trong thuyết trình.'
  },
  {
    id: 29,
    name: 'Học lại',
    type: 'restart',
    x: BOARD_COLS[3],
    y: BOARD_ROWS[3],
    title: 'Học lại củng cố',
    desc: 'Chưa đạt yêu cầu đồ án: Quay về Ô 1 (Xuất phát) để ôn tập lại, không trừ mạng!'
  },
  {
    id: 30,
    name: 'Kết nối FE-BE',
    type: 'question',
    questionId: 'q13',
    x: BOARD_COLS[2],
    y: BOARD_ROWS[3],
    title: 'Hai buổi vẫn chưa kết nối được FE-BE',
    desc: 'Tình huống học tập: Quy luật lượng đổi dẫn đến chất đổi trong rèn luyện kỹ năng.'
  },
  {
    id: 31,
    name: 'Nghỉ mắt',
    type: 'rest',
    x: BOARD_COLS[1],
    y: BOARD_ROWS[3],
    title: 'Nghỉ mắt thư thái',
    desc: 'Áp dụng quy tắc 20-20-20 giúp bảo vệ mắt sáng khỏe trước màn hình máy tính.'
  },
  {
    id: 32,
    name: 'Tốt nghiệp',
    type: 'finish',
    x: BOARD_COLS[0],
    y: BOARD_ROWS[3],
    title: 'Tốt nghiệp xuất sắc!',
    desc: 'Đích đến của hành trình học tập Camind! Chúc mừng bạn đã hoàn thành xuất sắc!'
  }
]
