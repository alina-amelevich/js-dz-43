## N.43 Домашнее задание TENNIS_DOM
Реализовать игру «Теннис» методами DOM (проект TENNIS_DOM).

Мяч прыгает по полю, слева и справа ракетки его отбивают.

Размер поля НЕ резиновый, он должен быть задан на уровне JavaScript-кода константами.

Запуск мяча — по кнопке «старт!», при этом мяч вылетает прямо из середины поля в случайном направлении под случайным (в разумных пределах) углом.

Управление левой ракеткой — клавишами Shift (вверх) и Ctrl (вниз),

правой ракеткой — «стрелка вверх» и «стрелка вниз». 

Пока клавиша удерживается, ракетка `плавно` движется; клавиша отпущена — ракетка останавливается.

Если ракетка отбивает мяч — мяч должен отпрыгнуть `от ракетки` (а не долететь до стенки сквозь ракетку).

Если мяч долетает до левой или правой стенки — засчитывается гол (ведётся подсчёт очков) и до следующего нажатия «старт!» мяч остановлен `возле самой стенки`, прикоснувшись к ней.

Никаких «волшебных констант» в коде не использовать — все константы вынести в начало скрипта с чётким документированием.
