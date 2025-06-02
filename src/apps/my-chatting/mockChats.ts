type TChat = {
  id: string;
  author: {
    id: string;
    nickname: string;
  };
  text: string;
  heart: {
    count: number;
    selected: boolean;
  };
};

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const me = { id: "1", nickname: "성우" };
const otherUsers = [
  { id: "2", nickname: "보연" },
  { id: "3", nickname: "민수" },
  { id: "4", nickname: "지연" },
  { id: "5", nickname: "철수" },
  { id: "6", nickname: "유진" },
];

const rawChats = [
  {
    text: "Qui id duis sit culpa nisi deserunt ut. Nisi anim eu in proident magna non ex duis nisi proident commodo.\nNisi mollit quis aute dolore. Veniam nisi enim aliquip cupidatat pariatur. Velit consequat est est qui laborum cillum aliquip fugiat velit ad anim esse minim. Ea exercitation Lorem velit amet ad reprehenderit. Non tempor eiusmod dolor elit proident dolor nostrud minim deserunt deserunt voluptate culpa ea. Ullamco pariatur in quis duis voluptate eiusmod dolore amet sunt fugiat aliqua ea pariatur.\nLabore ullamco anim anim sint dolore aliqua laborum. Ipsum laboris minim ex consectetur. Esse consequat exercitation ea anim velit nostrud non commodo. Cillum labore aliqua dolore mollit tempor exercitation non ut fugiat veniam laborum.\nNostrud adipisicing voluptate eu consectetur tempor mollit duis ullamco in ullamco culpa laborum nostrud. Officia ut dolor quis incididunt ullamco enim duis adipisicing culpa incididunt veniam ex do quis. Labore enim adipisicing enim et pariatur adipisicing dolore aliquip qui nisi est ea commodo dolor. Pariatur velit est cillum ut eu consequat do dolor. Dolor minim sit pariatur mollit deserunt pariatur irure amet elit anim sit ipsum incididunt. Exercitation adipisicing voluptate minim sit consequat. Irure sunt consectetur amet magna incididunt nulla voluptate ex cupidatat nisi laboris eiusmod cupidatat ex.",
  },
  {
    text: "Officia quis proident commodo exercitation pariatur pariatur nisi officia aliquip eiusmod officia proident commodo et. Mollit ullamco tempor sunt consectetur.\nSunt ea laborum minim reprehenderit id sint laboris proident. Proident incididunt reprehenderit veniam eiusmod. Ad deserunt ad consequat dolore consectetur. Ex quis in excepteur do deserunt sit nisi.\nDolore anim aliquip adipisicing amet ad fugiat adipisicing culpa ut tempor sit amet ea. Excepteur id in mollit irure Lorem eu. Id incididunt amet dolore nostrud elit consectetur velit fugiat nulla Lorem id elit. Adipisicing occaecat id proident incididunt tempor tempor mollit dolore minim. Veniam Lorem ipsum nisi consectetur esse culpa ad sit ipsum incididunt irure aliqua.\nDeserunt cupidatat quis ullamco aliqua minim officia non adipisicing aute. Et aliqua ullamco sunt exercitation veniam dolor. Ut ex ut pariatur elit ullamco officia amet aute aute nostrud. Mollit sunt adipisicing cillum sint nostrud enim non. Laborum dolore voluptate dolor consequat tempor nisi ea tempor deserunt officia ex consectetur.",
  },
  {
    text: "Cupidatat laborum culpa tempor qui reprehenderit. Adipisicing eu exercitation labore aute Lorem.\nQui cillum veniam nisi non quis aute minim ad sit. Aliqua qui quis adipisicing sint eiusmod sit velit adipisicing enim dolor dolor ad. Officia irure nostrud cupidatat nostrud in sit. Amet dolor pariatur exercitation irure adipisicing Lorem tempor minim nisi amet aliqua. Cillum incididunt eiusmod veniam laborum sint. Eu voluptate quis quis veniam labore fugiat mollit ea nostrud ullamco do excepteur ullamco.\nReprehenderit anim laboris in mollit. Enim ut tempor incididunt ullamco do ad mollit cillum. Nisi qui ullamco exercitation veniam ullamco velit aliqua dolore ipsum voluptate dolor laborum. Quis cillum et duis irure elit nulla esse in sint. Labore velit tempor elit ut velit voluptate ea velit irure et deserunt aliquip quis elit.",
  },
  {
    text: "Labore nulla in dolor non ea sit reprehenderit et eiusmod non aliquip incididunt deserunt. Lorem eiusmod amet irure pariatur laboris consequat cillum ad ut dolor amet Lorem.\nQuis commodo nulla nisi amet voluptate eu ex Lorem occaecat velit. Ipsum do eu eu duis. Ut culpa commodo labore sit mollit esse ad dolore. Ea et non laboris culpa sunt pariatur ex consequat amet cillum adipisicing enim.",
  },
  {
    text: "Pariatur deserunt Lorem id ex est do voluptate anim sunt esse exercitation nisi veniam duis.\nConsectetur ut cillum est ipsum Lorem adipisicing consectetur culpa. Velit et magna pariatur velit elit commodo. Mollit nisi aute nisi amet aute eiusmod incididunt. Occaecat qui irure irure sunt voluptate laborum amet incididunt aliquip sunt sunt reprehenderit fugiat ea. Reprehenderit adipisicing tempor officia id officia incididunt ad.\nEsse aliquip consectetur adipisicing aliqua consequat excepteur quis ex consequat tempor irure non. Commodo mollit esse nostrud velit dolor. Irure sunt laboris cupidatat amet consectetur magna magna laborum ex elit id.\nLabore nulla non velit amet sit occaecat ullamco ad eu. Commodo irure amet adipisicing sit laborum elit labore Lorem occaecat occaecat voluptate cillum. Aute consequat ex consectetur exercitation du스 magna du스 adipisicing amet sit.",
  },
  {
    text: "Consectetur elit officia sint mollit pariatur et quis qui tempor. Sit ullamco ad laborum ex.\nExercitation ad aliqua deserunt est eiusmod ea incididunt aute velit. Commodo laboris culpa voluptate ipsum deserunt consectetur laborum anim aliquip et anim. Ipsum elit aliquip incididunt aliqua ullamco dolore minim exercitation.",
  },
  {
    text: "Eu aliquip proident incididunt consequat officia officia id.\nLabore ex ex ipsum exercitation id consequat tempor eiusmod ipsum excepteur. Ea Lorem magna eiusmod cillum labore nostrud pariatur et dolore id laborum. Cillum voluptate fugiat fugiat in exercitation commodo non. Reprehenderit ut do laborum nostrud nulla in veniam enim tempor ea.\nEsse aliqua ea sunt minim commodo et nisi fugiat sit sit esse ex adipisicing proident. Ad ea esse veniam laborum minim ea. Occaecat exercitation anim ea sint aliquip nostrud ullamco quis consectetur. Ut culpa ex sint occaecat velit consectetur ullamco incididunt ex elit laborum ipsum ut commodo. Proident et ullamco incididunt sit cupidatat laborum tempor laboris in quis elit du스 est sint. Enim deserunt culpa deserunt dolore.\nExercitation enim sunt labore velit consequat nostrud adipisicing. Dolore dolore aliqua et ullamco enim sint ex. Sunt ad nisi labore elit consequat adipisicing excepteur ullamco voluptate pariatur nisi cillum enim excepteur.\n",
  },
  {
    text: "Dolore pariatur voluptate mollit mollit ex Lorem ipsum id commodo proident et commodo labore magna.\nNon qui labore dolor aliqua laborum esse. Velit culpa aliqua nisi nostrud irure Lorem mollit consequat. Eu nisi pariatur id amet pariatur ipsum culpa ad cupidatat incididunt fugiat amet.\r\n",
  },
  {
    text: "Sunt ea sint non qui occaecat do enim tempor id esse officia. Culpa commodo dolor veniam esse voluptate.\nAliquip sint commodo cillum fugiat ut enim pariatur cupidatat nisi sunt. Pariatur ut et aliqua ex fugiat ullamco dolor enim aliqua consequat magna magna mollit. Consequat aliquip mollit Lorem do tempor dolor non aliqua aute consequat ea commodo laborum in. Esse pariatur Lorem occaecat excepteur consectetur laborum quis voluptate nulla. Reprehenderit commodo consequat ex consequat dolor commodo culpa in enim commodo voluptate. Lorem ut duis proident excepteur consectetur eu laboris enim ea in. Consectetur nisi non excepteur sunt excepteur et cillum nisi laborum excepteur ex incididunt non.\nAliqua ipsum consectetur non reprehenderit. Fugiat nisi eu enim laboris fugiat id consequat commodo consectetur elit et excepteur et. Reprehenderit id do dolor voluptate. Ullamco laborum culpa eu laborum magna ea fugiat amet du스 velit eiusmod enim. Aliquip id du스 esse sunt exercitation eu fugiat ullamco reprehenderit in exercitation magna. Ad incididunt reprehenderit anim deserunt mollit incididunt aliqua dolore aliqua est fugiat dolor velit laborum.\r\nEa exercitation anim exercitation quis culpa aliqua magna pariatur. Consectetur elit du스 dolore veniam minim cillum pariatur consequat sunt. Aliqua voluptate ea dolore labore amet quis fugiat do consequat Lorem qui. Ea ex eu non anim voluptate mollit dolore minim non in. In ad velit ipsum elit dolor. Proident elit nisi eiusmod cupidatat sint commodo minim cupidatat ullamco qui commodo sit ad.\r\n",
  },
  {
    text: "Enim est commodo magna incididunt sunt sint reprehenderit deserunt id do. Eu laborum officia qui nostrud proident duis aute reprehenderit ut commodo ullamco officia qui quis.\nEx elit nulla sint elit officia deserunt eu fugiat laboris ullamco. Aliqua sint labore aliquip excepteur esse incididunt amet nisi ipsum Lorem. Veniam dolor eu ex esse est amet quis incididunt tempor.\r\nEx officia sit occaecat in ut est labore. Id esse ut laboris incididunt veniam irure laborum laboris non. Commodo eu pariatur duis nostrud nisi irure officia et nisi consectetur consectetur. Velit quis in velit excepteur ea esse enim duis. Ea magna velit nostrud consequat nulla eu nostrud pariatur labore tempor elit et cillum. Exercitation culpa do proident dolor do Lorem ex.\r\n",
  },
  {
    text: "Velit eiusmod non aute est cupidatat qui cupidatat consectetur laboris velit dolore tempor sunt pariatur.\nEt tempor et laborum cillum. Est mollit ex pariatur excepteur dolor non et nulla aute quis sint ea officia. Ea ut qui exercitation laborum. Exercitation anim laborum voluptate aute duis nisi excepteur officia. Sint minim nisi veniam nostrud elit deserunt nostrud tempor.\r\nDo occaecat culpa id laborum cillum nulla commodo nisi laboris laboris tempor proident. Cillum sint anim elit occaecat qui. Ipsum sit officia anim irure ex reprehenderit ut duis reprehenderit minim ipsum labore. Ea veniam pariatur mollit pariatur fugiat tempor magna reprehenderit nulla id enim occaecat. Sunt duis quis quis laborum quis magna ullamco proident elit esse nostrud Lorem nisi. Eiusmod quis aliqua adipisicing dolore aliqua minim voluptate fugiat mollit. Do dolor pariatur aliquip tempor tempor minim culpa cillum.\r\nExercitation deserunt duis esse est consectetur dolore anim. Eiusmod culpa est quis magna eu culpa laboris excepteur est aliqua Lorem proident aute. Nisi fugiat consequat excepteur cillum elit in tempor incididunt eu Lorem duis id dolore ad.\r\n",
  },
  {
    text: "Fugiat laborum officia consectetur eiusmod anim velit et laborum ad nostrud proident aliqua elit voluptate.\nCupidatat dolore mollit nostrud eu amet. Velit elit aliquip ullamco reprehenderit eiusmod ad voluptate. Anim non ea deserunt sit elit exercitation incididunt. Exercitation fugiat fugiat ex voluptate deserunt aliqua deserunt commodo veniam aliquip anim nisi. Nisi eu non duis duis adipisicing magna aliquip amet id ut Lorem amet. Irure tempor elit enim minim aute excepteur esse reprehenderit minim non et velit. Consectetur id aliquip sunt ad exercitation.\r\nExcepteur est non aliquip nostrud. Consectetur nostrud mollit duis fugiat laboris sunt dolor reprehenderit Lorem elit. Aute et veniam voluptate et voluptate fugiat tempor. Eu deserunt dolore magna labore.\r\n",
  },
  {
    text: "Nisi labore dolore est eu cupidatat consectetur veniam nulla consequat sunt. Nulla voluptate anim sint commodo.\nMinim duis officia et amet adipisicing sit minim anim in irure consectetur velit du스. Dolor ut occaecat ad anim du스 aute. Laborum ut elit proident ullamco cillum eu veniam commodo dolore esse laborum non fugiat.\r\nCupidatat culpa aute ex reprehenderit nisi voluptate proident ipsum aute occaecat veniam. Mollit aute eiusmod velit nisi sint ullamco aliqua sint quis voluptate qui est deserunt. Ex eu sint labore consectetur cillum pariatur esse ullamco nostrud. Eiusmod exercitation eiusmod commodo du스.\r\n",
  },
  {
    text: "Dolore ea magna elit culpa.\nConsectetur eu est reprehenderit anim eu quis elit veniam aliqua. Sint elit incididunt tempor incididunt consectetur aute magna ex. Esse duis magna ea magna pariatur sunt dolore ullamco sint consectetur nulla. Enim velit minim nulla et tempor dolore velit occaecat eiusmod duis. Aliquip esse irure nostrud ullamco amet irure. Cillum pariatur id nisi laboris. Tempor aliqua reprehenderit dolor occaecat.\r\nAliquip Lorem labore non ea. Proident Lorem enim magna pariatur nisi occaecat. Ullamco dolor fugiat anim fugiat. Anim dolor magna cillum veniam id dolor reprehenderit ut ipsum tempor laboris. Dolor magna anim do qui dolore eiusmod adipisicing cillum velit aliqua excepteur nisi proident anim. Deserunt tempor anim reprehenderit deserunt qui adipisicing pariatur dolore magna irure deserunt ea nulla.\r\n",
  },
  {
    text: "Adipisicing esse do non aliqua cillum consectetur deserunt tempor ea fugiat incididunt amet eiusmod.\nLabore tempor elit aute ad nostrud officia pariatur. Eiusmod est proident velit veniam tempor ea do nulla id nisi. Laborum irure magna incididunt laborum eu qui aute do voluptate in ad mollit. Cupidatat tempor et ut do exercitation anim ut. Elit excepteur quis quis non aute ullamco sunt esse cillum.\r\nDolor mollit excepteur quis adipisicing laboris aliquip ipsum nisi tempor et velit. Aliqua sunt nulla consectetur tempor. Exercitation non ex sunt ut mollit. Aute sit du스 du스 velit Lorem eu ad fugiat excepteur.\r\nLaboris labore pariatur ullamco pariatur amet sit sint commodo proident exercitation. Irure mollit dolore et fugiat labore ullamco tempor ipsum labore magna. Consectetur mollit id tempor sunt tempor sit sunt officia occaecat est.\r\n",
  },
  {
    text: "Ea exercitation velit exercitation Lorem et enim magna enim eu deserunt excepteur sunt consectetur.\nEiusmod tempor culpa deserunt incididunt in laboris. Aliquip dolore ut eiusmod magna do pariatur cillum. Veniam ullamco amet tempor laborum cupidatat sit in. Nostrud incididunt ullamco non nisi quis cillum culpa esse est deserunt commodo dolor. Non ipsum fugiat non et elit adipisicing dolore mollit.\r\nEst irure et minim eu est anim anim consequat consequat nulla sint pariatur anim sit. Exercitation nulla ex irure du스 ullamco ex. Sunt officia sint in Lorem. Non veniam consequat minim aliqua esse excepteur ex fugiat occaecat. Amet exercitation reprehenderit cupidatat dolor deserunt sint aliqua minim elit mollit.\r\n",
  },
  {
    text: "Fugiat aliqua reprehenderit mollit in consequat. Anim aliquip cillum proident aute dolore sunt voluptate nostrud officia cupidatat.\nMollit sunt veniam magna minim aute. Eu quis ad proident dolore deserunt exercitation velit ut cillum in sint ad reprehenderit. Proident do aliqua dolor in enim velit mollit.\r\nConsequat amet veniam fugiat est magna ea ex reprehenderit. Labore et pariatur do du스 est quis minim pariatur nostrud. Anim reprehenderit ad aute quis elit exercitation laborum dolor esse elit commodo. Anim velit excepteur cillum aliqua sint consectetur nulla excepteur cillum ex. Veniam magna tempor laboris et. Ad minim exercitation irure nisi anim. In dolor ut Lorem voluptate veniam sit.\r\nMollit sint do consectetur proident id sint. Irure culpa est voluptate adipisicing irure voluptate nulla dolor. Nulla id cupidatat reprehenderit et culpa. Deserunt enim ad laboris laborum ullamco proident voluptate tempor cupidatat amet. Esse aute esse ex ut. Aliquip enim nisi labore nisi. Officia minim magna mollit veniam elit nulla non amet laborum.\r\n",
  },
  {
    text: "Laborum exercitation fugiat in deserunt nisi.\nExercitation sint mollit eu consectetur commodo velit est dolor ipsum. Excepteur laboris enim eu quis occaecat ipsum mollit consequat qui ullamco. Esse sint culpa dolore dolore. Dolor non ullamco ipsum incididunt in Lorem commodo.\r\nProident irure pariatur qui exercitation sunt mollit excepteur do adipisicing minim du스 irure commodo. Amet commodo commodo officia qui excepteur incididunt enim laboris anim nulla qui in non. Ut velit elit do occaecat elit deserunt. Cupidatat pariatur amet minim ullamco voluptate occaecat aliquip commodo et culpa. Cillum dolore ad du스 minim proident voluptate aliqua ad laborum aute aute non id veniam. Reprehenderit ipsum labore elit quis ullamco amet dolor nulla esse in enim cillum.\r\nSint consequat aute quis du스 adipisicing. Consequat dolor consequat reprehenderit ex reprehenderit anim irure aliqua laborum ipsum minim mollit eiusmod aliquip. Lorem minim culpa amet minim ad cupidatat. Dolore exercitation aliqua mollit sit incididunt qui officia aliquip irure officia laboris.\r\n",
  },
  {
    text: "Aliquip do officia ex ea pariatur nulla.\nDolore magna non culpa voluptate deserunt. Non eu minim aute exercitation veniam pariatur magna labore deserunt exercitation consectetur reprehenderit. Duis ipsum aliqua ea amet aliqua cillum cillum officia non consequat dolor nisi minim. Magna laboris sit irure veniam ut. Voluptate irure eiusmod veniam sint adipisicing enim voluptate tempor. Duis eu officia veniam nisi proident veniam deserunt ullamco proident.\r\n",
  },
  {
    text: "Consequat mollit aliquip aute labore excepteur exercitation est magna veniam consectetur veniam.\nAute officia laboris eu non minim aute sit aliqua eiusmod. Amet sit du스 sint du스 fugiat fugiat minim eu magna. Adipisicing elit cupidatat aliqua nostrud enim incididunt fugiat amet do.\r\nMollit enim tempor voluptate ullamco. Sit nisi nulla nulla proident laborum nulla aute aliquip qui ullamco. Ad nostrud dolore sunt excepteur cupidatat aute commodo reprehenderit sint velit non nisi. Tempor magna ex amet dolore. Excepteur id irure nostrud dolore Lorem minim eiusmod reprehenderit. Irure veniam ullamco proident occaecat minim proident incididunt dolore consectetur reprehenderit consectetur reprehenderit. Nulla in in eu enim aute est sit magna adipisicing irure.\r\nEu magna deserunt occaecat nulla tempor enim. Ea tempor elit voluptate voluptate. Quis dolore mollit nisi in commodo id culpa nisi. Aute ullamco laborum deserunt aliquip adipisicing ut occaecat minim eiusmod tempor sunt aliquip.\r\n",
  },
  {
    text: "Officia ut consequat nisi do est non deserunt sunt voluptate et esse do magna. Excepteur consectetur dolor in pariatur irure non irure eiusmod nisi sunt.\nProident id do est esse exercitation exercitation qui Lorem quis ullamco du스 et. Labore officia ad irure elit occaecat. Dolor irure cillum ut velit exercitation ipsum dolor incididunt est. Proident minim sit dolor esse non. Exercitation veniam qui dolore excepteur ex consequat amet pariatur ullamco. Minim voluptate ex eu nulla labore.\r\nOfficia veniam elit consectetur esse commodo consequat elit. Tempor dolor non ipsum eiusmod in. Et do eiusmod excepteur aliquip nostrud est. Est est voluptate eu labore velit anim minim in. Duis eiusmod reprehenderit ea id aute occaecat ut cillum ea ullamco.\r\n",
  },
  {
    text: "Laborum ex id mollit veniam cupidatat consectetur cillum enim aliqua Lorem veniam du스 est. Dolore laboris amet adipisicing cillum esse consequat culpa.\nVeniam mollit minim pariatur elit culpa veniam dolore non anim cillum qui ea. Sit minim anim ullamco irure eiusmod Lorem dolore magna deserunt ullamco. Id amet consectetur magna cupidatat nisi aute aliquip enim nulla consequat sit labore tempor voluptate. Reprehenderit qui sint magna consectetur proident ea non ad enim deserunt proident esse Lorem. Magna aliquip eiusmod excepteur sint laborum non consectetur veniam laboris. Quis culpa magna incididunt fugiat exercitation est est.\r\n",
  },
  {
    text: "Ex dolore aute laborum proident du스.\nEa elit commodo laborum esse aliquip exercitation do eu commodo. Enim exercitation enim irure aliqua ullamco. Ad mollit aliqua labore proident aliquip. Ut occaecat adipisicing anim occaecat cupidatat ut culpa Lorem est aliquip amet ipsum aliqua.\r\nVeniam in nostrud dolor Lorem culpa laborum occaecat aliquip nostrud aute sint amet. Eiusmod ut nostrud consectetur du스 ipsum. Sunt nisi officia minim occaecat irure minim sint est occaecat.\r\n",
  },
  {
    text: "Ullamco sunt ex ea eiusmod ut enim voluptate. Consectetur in ipsum consectetur quis nostrud ea laboris ipsum ex.\nEnim et commodo veniam labore cillum eu et exercitation laboris cupidatat nisi consequat. Ea id consequat cillum quis proident Lorem labore veniam est id. Excepteur veniam amet cupidatat magna consectetur. Minim du스 consectetur id do.\r\nAdipisicing officia eiusmod veniam dolore sunt elit dolore adipisicing commodo excepteur. Irure id fugiat mollit eiusmod consequat. Laborum nulla enim minim labore est nisi veniam. Aliqua qui ipsum fugiat sunt excepteur eiusmod anim quis dolore elit aliquip amet. Occaecat cupidatat consectetur do proident proident consequat elit eiusmod elit exercitation amet incididunt ullamco pariatur.\r\nSit tempor non occaecat dolor fugiat velit commodo ullamco id ut commodo velit. Fugiat nulla elit do eiusmod aute in aute anim sint exercitation aliqua eu. Voluptate aliqua esse ea ipsum deserunt aute laboris do sunt du스 nisi ipsum do do. Velit officia officia veniam reprehenderit consequat Lorem dolor fugiat. Occaecat sit magna do ut veniam sunt ad ea sint sunt laboris deserunt exercitation. Ea ex nisi laboris pariatur dolor aliqua consectetur mollit anim culpa. Qui exercitation elit labore commodo ullamco amet cupidatat laboris nisi commodo deserunt.\r\n",
  },
  {
    text: "Incididunt excepteur adipisicing non ullamco dolore excepteur amet. Ipsum sunt cillum et amet esse amet.\nLaborum dolore adipisicing nostrud dolor ullamco dolor. Eiusmod cillum in exercitation sint excepteur minim velit nulla. Ex nostrud ut pariatur et ipsum sint non ex amet.\r\nIncididunt laboris mollit sunt occaecat proident Lorem aliqua irure est labore officia. Fugiat qui laborum enim mollit consectetur ipsum culpa nisi elit. Aliqua sint eiusmod aute ullamco tempor labore non magna du스.\r\n",
  },
  {
    text: "Tempor elit deserunt mollit reprehenderit ipsum sint. Aliqua sint irure elit dolor excepteur ut labore magna sit cupidatat.\nEt laborum quis sint minim et occaecat ullamco aliquip amet id culpa laboris. Anim deserunt qui ut eiusmod irure du스 consectetur esse fugiat occaecت amet quis eiusmod. Quis nulla eiusmod cupidatat et cupidatat nostrud minim aliquip reprehenderit fugiat reprehenderit aliquip ipsum Lorem.\r\nSunt labore aute magna laborum eiusmod reprehenderit dolore eiusmod. Quis ad voluptate qui dolor labore velit enim occaecت anim labore fugiat sint aute. Non culpa cillum eu nostrud anim ex officia ad ad esse ullamco. Voluptate velit reprehenderit nisi et. Officia consectetur officia irure consequat et. Excepteur in ex ex ut. Occaecat fugiat proident non tempor.\r\n",
  },
  {
    text: "Cupidatat id ipsum occaecat culpa enim non labore cupidatat culpa excepteur.\nEx do nisi Lorem commodo consequat est tempor dolor aliquip esse ex magna aliquip. Duis ea cillum elit sit est aute aute non du스 qui. Minim minim consequat minim id consectetur sint. Excepteur aliqua nisi esse velit laborum aliqua pariatur aliquip ad culpa consequat anim ut. Ut excepteur ea excepteur eiusmod consectetur est incididunt qui cupidatat officia exercitation consequat.\r\nAliqua nisi fugiat consectetur ad ad sit fugiat nostrud Lorem. Culpa non du스 id reprehenderit officia ad dolor sunt laboris do in aute. Deserunt id irure nulla ipsum proident voluptate id.\r\nOccaecat cupidatat reprehenderit sunt nulla ullamco id ad cillum nisi excepteur id deserunt amet. Duis ut veniam minim anim incididunt amet. Laboris quis velit minim aliquip veniam velit. Sunt consequat ex reprehenderit velit laborum elit ut proident voluptate cillum do. Cillum reprehenderit non dolor ad sit deserunt voluptate cillum incididunt.\r\n",
  },
  {
    text: "Enim nostrud reprehenderit reprehenderit amet quis velit consectetur proident sunt exercitation non nisi amet. Deserunt quis ullamco quis cillum ea anim reprehenderit amet culpa nisi do sit.\nOccaecat aliqua amet du스 ex ipsum cupidatat eiusmod non ex excepteur aliquip tempor nulla. Labore esse adipisicing in proident irure pariatur veniam laborum elit sint quis ut commodo. Enim amet minim dolore elit reprehenderit magna sint in Lorem id anim ea laboris. Id aute culpa in qui nulla dolore occaecat esse occaecat commodo. Quis ipsum voluptate nisi ut labore ea dolor ipsum magna eu. Reprehenderit ex anim occaecat cupidatat enim velit veniam cillum officia adipisicing ad esse. Incididunt in deserunt aliquip amet.\r\nLaborum sunt pariatur magna tempor qui id exercitation incididunt tempor sunt ut. Exercitation ut aute eiusmod laboris deserunt qui non Lorem irure officia culpa Lorem. Proident velit eu incididunt est deserunt quis non fugiat tempor in.\r\n",
  },
  {
    text: "Cupidatat officia occaecat consectetur ipsum Lorem fugiat adipisicing.\nEsse cupidatat nisi elit do Lorem. Tempor irure consequat ea esse nisi occaecat. Reprehenderit dolore est adipisicing velit officia sunt cupidatat exercitation. In cillum adipisicing minim aliquip. Adipisicing consectetur aute ex enim laboris commodo id ex. Deserunt nulla eu eiusmod amet reprehenderit. Ullamco anim esse deserunt exercitation ut est irure sit velit culpa.\r\nEst adipisicing laboris ad nisi enim commodo fugiat. Nulla excepteur anim et sint irure du스 ex eu veniam do et adipisicing et. Sint ullamco quis officia ad occaecat labore irure.\r\n",
  },
];

export const mockChats: TChat[] = rawChats.map((rawChat, idx) => {
  const isMine = Math.random() < 0.3;
  const author = isMine
    ? me
    : otherUsers[getRandomInt(0, otherUsers.length - 1)];

  return {
    id: (idx + 3).toString(), // Assign sequential string id starting from '3'
    author,
    text: rawChat.text,
    heart: {
      count: getRandomInt(0, 5),
      selected: false,
    },
  };
});
