function getRoot(as)
{
  var l = as.length;
  for(var i = 0; i < l; i++)
  {
    if(!as[i].includes("->"))
    {
      continue;
    }
    var name = as[i].split(" ")[0];
    if(!isHold(name, as))
    {
      return name;
    }
  }
  return "Error: root-element not found";
}

function isHold(name, as)
{
  var l = as.length;
  for(var i = 0; i < l; i++)
  {
    if(!as[i].includes("->"))
    {
      continue;
    }
    if(as[i].split("->")[1].includes(name))
    {
      return true;
    }
  }
  return false;
}

// if there is a misbalance the negativ needToBeWeight gets returned
// note: would be useful to return the name of the misbalanced element as well
function getStackWeight(name, as)
{
  // look for element
  var el = getElement(name, as);
  // is holding stuff (has sub elements) ?
  if(!el.includes("->"))
  {
    // no -> just return the weight
    // return parseInt(el.trim().replace("(", "").replace(")", ""));
    return getElementWeight(el);
  }
  // yes -> get sub-weights
  var subEls = el.split("->")[1].trim().split(", ");
  var subWs = subEls.map(subel => getStackWeight(subel, as)); 
  // is one of the sub-weights negativ ?
  for(var i = 0; i < subWs.length; i++)
  {
    if(subWs[i] < 0)
    {
      // yes -> just return that value
      return subWs[i];
    }
  }  
  // no -> balanced ?
  if(isArrayBalanced(subWs))
  {
    // yes -> just return weight + subweights
    return getElementWeight(el) + subWs.reduce((sum, val) => {return sum + val});
  }
  // no -> return -needToBeWeight
  var uIndex = getUniqueValueIndex(subWs);
  return - getNeedToBeValue(subEls[uIndex], as, subWs[uIndex], uIndex == 0 ? subWs[1] : subWs[0]);
}

function isArrayBalanced(ai)
{
  var l = ai.length;
  if(l < 2)
  {
    return true;
  }
  var value = ai[0];
  for(var i = 1; i < l; i++)
  {
    if(value != ai[i])
    {
      return false;
    }
  }
  return true;
}

function getUniqueValueIndex(ai)
{
  var l = ai.length;
  if(l == 1)
  {
    return 0;
  }
  if(l == 2)
  {
    if(ai[0] != ai[1])
    {
      // both unique, take the first
      return 0;
    }
    else
    {
      return -1;
    }
  }
  // l >= 3
  var ref;
  if(ai[0] == ai[1])
  {
    ref = ai[0];
  }
  else if(ai[0] == ai[2])
  {
    return 1;
  }
  else
  {
    return 0;
  }
  for(var i = 2; i < l; i++)
  {
    if(ai[i] != ref)
    {
      return i; 
    }
  }
}

function getElementWeight(string)
{
  return parseInt(string.split("->")[0].trim().split(" ")[1].replace("(", "").replace(")", ""));
}

function getElement(name, as)
{
  // look for element
  var l = as.length;
  for(var i = 0; i < l; i++)
  {
    if(as[i].split(" ")[0] == name){
      return as[i];
    }
  }
}

function getNeedToBeValue(stackName, as, stackWeight, balancedStackWeight)
{
  return getElementWeight(getElement(stackName, as)) + balancedStackWeight - stackWeight;
}

// "cqmvs" for given input
function solve071()
{
  return getRoot(input.split("\n"));
}

// -2310 for given input ('-' signals the misbalance, so the need to be value is 2310)
function solve072()
{
  return getStackWeight(getRoot(input.split("\n")), input.split("\n"));
}

input = "fjkfpm (69) -> kohxzh, liwvq, eqkio, xvoyybs\ndsiixv (52)\nfhimhm (66)\nmdlubuq (73)\nulobwyb (41)\ncbgnzhz (70)\nhrheyzf (946) -> fixqj, msyvs, pdwjcd, tlgdija\nyrnjhqc (31)\nxlglga (714) -> hohft, funabvw, zhxnpoh, unpdcwm\nhcvwov (240)\nqnhvjec (35016) -> pimzjjp, ghatw, tbakk, olgmto, qeaqiuq, wnmnz, aabbf\nefgdfa (405) -> uyedi, rxkmf, syhipz, zozcoqd, uwprsvh, dqhoh, rcbhgw\nvofrtf (55)\ngipbso (52)\ncviwy (426) -> ildgly, syojg, tgoztyw, doavm\nokzkfw (159) -> ndteuz, bkmepbs\nylfvgv (5)\nydxuhqe (72) -> bfftnj, uwrll, njlaepf, kbfpx\nhwfcy (54)\niqtdzrh (65) -> qoppte, jcsqqxv\nddumyx (220) -> yjowio, gefjk\nedagh (12)\nkefudoj (82)\nindjoox (36)\ncliojs (35)\nlrvmyj (79) -> fadkfic, pcikcq, fgeup\nmvyzuw (73)\nnholw (52)\nsjbqzk (212) -> sijon, bcedyx\nmajskr (49)\nqjutng (15)\niavwfbb (19)\nywonug (50) -> dgjyf, kobwktw\ntaxky (77)\nlufkiy (44)\nlcwqdxx (34)\nfelksho (204) -> vkile, ihadu, qfczh, wvgzlw, axawjtm, eutun, vkzmf\nrvtus (94)\nzjxjhwc (53)\nbnmsz (95)\ncvcyykp (31)\nbfxvxpl (35)\nniavkxg (16)\nzwcsjgs (7)\ngtqwrrx (44)\nvszpkfs (107) -> rubvop, qsvjd\naxawjtm (12) -> gtbocpw, oxlvr, mvfjras, vgyzdkt\nulvbf (82)\nvkzmf (252)\njnedlwi (100) -> rkftwvy, gwyrtw\nsztry (247) -> vddarvs, tlzlq\nanwbrxk (69) -> ybnsg, rfwgt, pcppql\npfxoef (66)\nghqixh (171) -> cjcytbb, dmare\njwrmi (130) -> mhrzazo, qeuwgn\numsrz (7) -> jwrbg, wqpahuv, zquvn, sfjyf, uebmnqa, qqkqhzb, gmbup\nwtsqx (46)\nrzldn (31)\nusmtdk (166) -> pikelbw, edwlns\npyhecs (59)\nshwsf (56) -> wtbst, ryjqaz\njhkkrg (63)\neaagt (40)\nwkbqm (59)\niivwxhd (150) -> yfgyi, grdimrp\nnlkwsrn (50)\nidnsypp (94)\naixwgk (41)\nyhhnavm (84)\nlngdxkd (146) -> hkkzpzh, ihvfxeo\ndkwwoa (73) -> sntbr, xbywgft, xlkvx, akght\njevqne (8)\nvurnn (81) -> fkehyrg, qhktzou\nngoog (20) -> uusec, rrnkqx, jafsqqu, ryeiot\nhxhguzh (75)\nkohxzh (1765) -> mjpmw, cbmkr, vmofl, wsjizsy, redeub\ntwpvnu (56)\nkzumm (132) -> czgxag, vytlfm, qowepn\nfgnye (44) -> pxcjw, bnmuprs\njvqfj (60)\nyvllxxw (55)\nhsmaze (34) -> fxzqvoh, fcvsqp, okzkfw, vwtsdsf, ipbbnp, txdprek\naujdy (14)\nyjcevge (61) -> rpyxxhm, tfbqaoe\nblcpm (217) -> qibrsjj, wcfykko\npfltnc (44)\nanqas (63) -> riuwg, jhkkrg\nrtseps (51)\nvmkfcpw (92)\npcppql (78)\ntqrqs (43)\nsyxdt (12)\nejlecie (79)\nxpdmegi (16)\ndgjyf (62)\nuxhpm (51)\nznchnta (66) -> sutzt, kvjyw, hlshpkq, corcne, rflrj, yhadh, ouypz\nzmdvl (50)\nfixysjm (1386) -> zjylql, ytadaxm, fgnye\nyevywe (63) -> qeayjnt, ixyeq, hgaoiz, rcfaaml, zuzhmf\nrxkmf (811) -> yedvssr, xvwgxm, wfeurd\nmcmzs (53)\nvsmdkp (60)\noyurf (27) -> zhjtcdl, jswxshd, hfwpcsa, lbvfwz, obolmhh, grgkv\nyawmlbb (191) -> iavwfbb, xjjvneg\nfblsn (44)\ndoavm (223) -> drasjw, cwwwcge\nudyivld (18) -> osrdt, jpyojky, vhnnnv, gyxqc\nddqnllo (167) -> cdfij, quohxia\nbwbym (55)\nufpdyq (22)\nhkjcnv (73) -> nderndc, owjtoo\nndhravs (10)\nqjkkohe (25)\njrott (44) -> jgylf, kaitdu\nunvqq (173) -> lxdji, ldkojcj\nzrgqfb (81)\ncsbgxs (29)\nqeaqiuq (1106) -> nwlkk, ytyhmux, nxmtm, izpta\nrqeftjw (51)\ntbakbq (62)\nvnhhu (62)\ngrgkv (85) -> xgmrufk, cvvkno\npggrr (29) -> bttvl, zrmzpo, upatvy\nzumdwwu (43) -> jfssr, aujdy, adkyx, mragx\neuxvn (105) -> qtazfdw, uzarat, mikalda\ntpbcg (98)\nkdnwlnz (36)\npncda (183) -> uswszht, zeebqts\nzlvjnx (130) -> vctupmx, gmxdpc\niljdm (203) -> emqwt, leknm\nlmgxknk (49)\npikelbw (34)\nkqqegw (89)\neigsdc (20)\nqbhvu (94)\nkqoae (61) -> tqrqs, bfozr, kkqeg\nbozfw (5)\nsilwwua (20867) -> kzocw, ymhsa, mzcebu\nfcxninx (473) -> pmxzfd, kbvzpv, zskam, oyurf\nihvfxeo (14)\nrkftwvy (52)\nkccra (26)\nvkxbeox (353)\nsuiagk (59)\nlnqzgti (60)\nleknm (50)\nyxvmxzg (35)\njezubi (54) -> lnqzgti, hvsiuf\nbzqhk (33) -> ndmpgss, kcoayj\nxaovjvs (74)\nmjuyo (263) -> psrup, boeuyxx\ntvoptyn (1776) -> xjbtfms, tiphry\njbhohbx (25)\nkqfgnql (22) -> pmozz, hspqr, ydxuhqe, txhxoib, cncoep, ripidvx, qezvrjl\npdkfixk (22)\nkxzwel (80)\nsykmuwo (243) -> zvogn, esmbu\nlivul (40)\nrvmntl (346)\nxqztuq (24) -> pyhecs, jqgkz, bsythck, ranlxct\nedyohkw (79)\nhszzxp (64) -> xcdswr, oukuy\nyfgyi (56)\npmozz (74) -> ngaawt, oaknu, cgbkrnc\ntfglbeh (56)\nwpvozgo (53)\nnjaig (77)\njwrbg (134) -> fymyi, utpyp, ulxscm, cliojs\nolnfe (33)\njcsqqxv (52)\nfvkew (21)\nnkdbmjv (34)\nfhjgv (55)\ntvqlaw (14)\nwqpahuv (274)\nmyoyl (82)\npjzcs (38)\npcehxbx (1859) -> hlfmvdt, ngoog, mwhraq\nkqohkg (56) -> hezkdc, kgfudu, omeew\nadtpk (1655) -> unvqq, bpbwl, anqas, kmnzz\nafihdk (65)\nrtiaapt (18)\nobolmhh (109) -> lufkiy, kiryhz\ndkegbrt (45)\nrbiarxk (81) -> erngeah, cqcjys, bxjqibv\nhmrzqlh (87)\nbiemun (295) -> ejbtu, hszzxp, kcxiq, khixwdd, usmtdk\nmvfjras (60)\nuqktn (246) -> gtqwrrx, qtshuo\nkmpmdb (8)\nlylxk (22)\nnxmtm (84)\ngoapac (88)\nzlxlwv (43)\nnirov (74)\nfcjjqev (78)\nfinxtiu (92) -> vgdsszs, gofjvi, mxpvph\nuvpwrf (73)\nvgnkq (104) -> jczkx, iydqii\ngsbmh (84)\nssblis (86)\nknvxq (1845) -> pvbgvb, mcghosj, qocnylk\nkvjyw (57) -> livul, eaagt, rukzsa, gsdzpjh\nzhpdhat (76)\nypjnmr (39)\nyauryvu (97)\nucahbv (82)\nrkswk (70) -> kccra, lqasevp, bdvtnul, swqres\nbqvtbsr (39)\ncmfcqh (149) -> wlwnand, zikmmr\nouypz (67) -> mxelfv, fogmaih\nnlrbcxx (41)\nmrmuat (21)\nkcxiq (150) -> mdvnu, dcwcs\naabbf (881) -> dsoyvp, hwraaxu, lrvmyj\nmjxfsc (53)\ndmare (55)\niruee (89)\ngpsnzs (76)\nwnpkwy (27)\nzvnzep (174) -> tvqlaw, aufxtq\nyysyjbk (1630) -> wpvozgo, mjxfsc, iality, vwupkmh\ncgbkrnc (62)\nmnfknb (41)\nkcoayj (89)\nvybmch (79) -> ebyfpmf, dnqdmxc\nlmrzi (87)\ntiyvea (30)\npcikcq (36)\nmlqoz (20)\nbrmvw (144) -> qjutng, janbnmh\nzgkxkj (72) -> bwrpc, wntfmtn, hwjmzs, vkxbeox\ngzcbv (54)\nnsqpaq (55)\nhohft (69) -> hfjtksr, efzjseb, ypjnmr, bqvtbsr\nkkqeg (43)\ngafjq (74)\nhaano (296) -> rlburl, njkvleo\ntvbmh (99)\nfvsitx (212) -> nsvwcl, hohrape\nyhtpdwu (71)\nqxsjs (95)\nqseqsgt (22)\nvkhdfmv (36)\nikicwez (69)\ntdrdq (24)\nbgudw (94)\nzhjtcdl (134) -> ceutto, fhynmi, qmyohe\npavtnxe (38)\nxvoehjz (301) -> zznjih, wseim\nklfyu (40)\nzhxnpoh (119) -> ltyxiwk, wkgouh\nbezoxx (184) -> afihdk, jevfpj\nivldghm (64) -> enmxpmj, wsrrryh\nosnpbou (111) -> zpuktmx, itlno\nuofuvf (70)\nmgvcyl (51) -> nsqpaq, fhjgv\nlluabej (97)\nhwjmzs (273) -> agsfbkx, znswber\nudlhalx (26)\ngewlsr (476) -> uqktn, nknpwkc, udyivld\nfsjvyxv (27)\nbirtjxh (78)\neplltu (84)\nsdixs (54)\nkqdseyh (46)\nlfrfa (76) -> ejlecie, mvxud, wgevvca, carfsnj\nlbwgsap (33) -> gpsnzs, santsu\npnjtt (45)\nrcfaaml (157) -> avemxf, ehwcxy\ntbutks (36)\nxmhdsio (91)\nbyjcsn (51)\namslmyk (96)\njtdvzj (62)\nxnaam (88) -> lylxk, sybcl, kuqsuy\nboeuyxx (53)\npxcwhq (30)\nmckyvtt (52)\npctkyat (25)\nlomxh (53)\nltccbob (297) -> ndhravs, qlryl\nvgyzdkt (60)\npyzbqz (74)\ncjkieim (519) -> myeecwt, agtab, rhtqj, mmriyf, mfcutqz\nducdc (41)\nmnxoac (30)\numtmwow (30)\nqsxqwub (94) -> klfyu, mlzfw\npdwjcd (105) -> vcoszdq, fkmpv\nwifaf (41) -> dnunil, gafjq, gwgchq\ntpabsyz (91)\nuwrll (47)\ndcjiqny (1371) -> npblyaq, qeoetnp, qoeviy\nrlburl (9)\nitlno (37)\nehpdfno (285) -> bcrso, jqwaifx\nnjkvleo (9)\nuswszht (24)\nqvpou (180) -> sndject, bzmhwwo\nngaawt (62)\nkyhezqn (45)\narouwsi (59)\nuyoez (99)\nquoqibc (195) -> znuldtj, bljppq\ntiphry (33)\nlbvfwz (89) -> qypsl, gzcbv\nbzmhwwo (5)\ntcbxnrf (285) -> ybgdelp, aqrpio\narjgn (392)\nqfczh (218) -> ivhtlxa, jdazgj\njpyojky (79)\nzinjsj (30)\nqfsmgqe (982) -> mgvcyl, cekchxh, qnscg\nmlzfw (40)\nulszlax (42)\nmyeecwt (69) -> veiljb, wydtqax, pnjtt, sxwbzyj\nvkuucpv (260) -> fenymdp, uwehdau\nqezvrjl (212) -> jdqhjk, htwzu, lzevbng\nqnscg (161)\nwkkkv (11)\nbpbwl (149) -> mlqoz, miwjfr\nicspwbg (83) -> iljdm, sztry, anwbrxk, ddqnllo, gtbmrcp, cpzwgk\nbddlvs (70)\nmragx (14)\nvdyhna (166) -> glori, azttml, jxraf\nzjylql (78) -> fsoqc, hefjuue\njdqhjk (16)\netkzf (11)\ngrdimrp (56)\ntlics (101) -> twpvnu, tfglbeh\nkskkjn (1081) -> uxmjgh, kqoae, wswwck, zwymlsj, qvpou, mtxzek, elxccty\nqsvjd (31)\nuurqa (33)\ngytzi (18)\nxsvage (27)\ngefjk (21)\nvpbec (263)\nmocpa (79) -> ldvcrw, atxfply, ogtxa, rbbkdj, blcpm\nwsdqchf (71)\nzznjih (11)\nryjqaz (73)\nhspqr (66) -> hjxzwnq, ojrixty\nphkzo (263) -> licst, nbkzscx\nhaayebg (39) -> ogziig, pyscsi\nkbdnbnd (94)\nioyealn (51)\nnuoic (20) -> pmssap, bzuago, tvbmh\nkuqsuy (22)\nhvsiuf (60)\nwerskvv (78)\nhohrape (90)\nsybcl (22)\nksnxlcl (117) -> sdjxpp, yzpyzu, ulobwyb, afbnq\nqlchz (5277) -> doxfeq, luiiv, hsmaze\nihadu (144) -> dquqam, ctvrea\ndquqam (54)\npjamo (113) -> vnhhu, jtdvzj\nxeypnpr (183) -> qiund, kdnwlnz\nloaft (59)\nloykzr (16)\nbsbsdiu (81) -> ssmhkwq, alolk\nefzjseb (39)\nlbkrk (17)\nipbbnp (127) -> iauetan, tbakbq\nuilvahq (1076) -> oztxjfl, oiufrau, ewyrp\ngmbup (274)\ngldvef (18)\nevvfcyi (13)\nnbhdty (97)\nncbrxsy (15)\ndnunil (74)\nzcggn (56)\nmbcwjt (225) -> wxyaqte, kpffozq\nvgkjgy (16)\nbcnqhw (298) -> ohqivu, jzwusi, jzcstbe, xayqwyj, kmwkft\ngyxqc (79)\nripidvx (148) -> rergyy, rwhjmp\nmxpvph (67)\niauetan (62)\nvoawog (34)\nmzcebu (11) -> rlgrkq, xlglga, hrheyzf, gbwfjf, mhkrny\nsexuv (92) -> ednlrw, zcggn\nfezoyaj (78)\nuxmjgh (70) -> mnxoac, pxcwhq, ytjheqk, tmtfhr\ntvfptpz (73)\nrywggm (78) -> gxuovng, ragcph, epstabj\nymhsa (7457) -> zzqtmxd, yfwwrkp, yahzcyp, hmugaom\nygvvvq (392)\nizssdb (215) -> ycseeag, ytzdrvj\nbttvl (95)\nabjmd (30)\nmspxpr (1837) -> fvhvq, guvto\nenogehk (45)\ncqcjys (44)\nrfllomn (107) -> lqndkq, tzkgrjf, lcius, lhlgijf\nwvdswpz (34)\nocqrpkf (46)\noaknu (62)\nqvrtwdt (1289) -> jnedlwi, sexuv, vcauqo\nprnno (95)\nwgjst (177) -> bozfw, salxel, jrrhzc\nteapi (35)\nadkyx (14)\nhuxtvqc (16)\nmznsk (11)\nfcvsqp (183) -> ebjgfh, bnvjfq\niwkotv (89)\nmkykc (90)\ndlrznye (83)\ngtxdtf (42)\nahism (144) -> gkitfsr, osbndxb, zielffk\nznztzxd (29183) -> jcsjaxj, hrwtz, fcxninx\njsbug (85)\nkfkhxg (51)\ntcpvyfj (18)\nfpdoney (16)\nkfefhun (27)\niufvcm (38) -> xjejd, goapac\nfzltz (8)\nrukzsa (40)\ndoxfeq (154) -> kzumm, vurnn, fzbwmsz, bsbsdiu, pncda, rtromur\ndfrzb (53)\nrpbeiqg (170) -> qseqsgt, qmeawpu\nycseeag (28)\nblfinsi (52)\nkvsprca (65)\nuzarat (35)\nzzlocxd (62)\niality (53)\ndaxbf (805) -> iktev, xqztuq, bsvoy\nhfjpir (19)\nbsiwtqq (58)\nqnepf (88)\ndasmiiw (56)\nwseim (11)\nlvgrmfu (180) -> ngiol, iwidsj\nnsoju (38)\nzqaxyz (59)\nqocnylk (41)\nfhynmi (21)\nxeege (12)\nmfslhp (95)\nalolk (75)\nqtazfdw (35)\nsijon (37)\nzzpevgd (17) -> smqtcaj, emxwr, uezxhid, blvyrzh, lvgrmfu, vkuucpv, eivaf\nglori (15)\nssmhkwq (75)\ndmkhzgg (149) -> fuwekd, bwbym\nxqrrpu (29)\nyjowio (21)\nmhrzazo (36)\njakmbx (39) -> egyfwny, khdzsr\nqzgdlb (33)\nlwysj (49)\nczgxag (33)\ndrasjw (20)\npxcjw (41)\nhwfzj (321)\nssxqkhq (67)\nndteuz (46)\nrwhjmp (56)\nxsuxhbq (1268) -> injlqnw, vdyhna, bzqhk\naufxtq (14)\nnknpwkc (164) -> pwyfdan, jsbug\ndqhoh (787) -> xeypnpr, quoqibc, wisdd\nlqndkq (54)\nvabii (89)\npmxzfd (747) -> xnaam, iaoxdmm, hsywhj\nfuexyx (8)\nwkxyxtf (20)\nbfftnj (47)\nhoqti (6514) -> jviven, znchnta, daxbf\naqrpio (24)\notsyp (54)\nvgdsszs (67)\nlswutyd (60)\negyfwny (73)\nwyiec (56)\nqeayjnt (31) -> qbaig, yhhnavm, eplltu\ntjzkwy (59)\nvwtsdsf (251)\njzbnq (78)\ngtbmrcp (303)\npzoaqn (94) -> ierop, llepsqz\noqfiqf (185) -> nirov, pyzbqz\nkjtwz (97)\ngmrkqq (86)\nnnkru (16)\nnnpvdm (5)\nrlgrkq (9) -> uakxuru, qvzjgne, xhrqzk, xatzz, hwfzj\noukuy (85)\ngsiokvq (80) -> tcbxnrf, mfunt, tyqnwi, yzxqqx, ehpdfno, oqfiqf, clizzo\nqluzb (58)\nbzorz (66) -> ulgrn, kjmvhpa\niqckb (103) -> zuaamot, knfath\nzikmmr (87)\nugplhkq (58)\nvddarvs (28)\nagsfbkx (40)\nriuwg (63)\nmmprixv (66)\npimzjjp (58) -> dresofi, riogonj, encjlzj, rvmntl\neiekcd (66)\ngxuovng (38)\nvfdulx (6) -> bhnwdot, qxqdyx\niizpgi (84)\nctvrea (54)\nqscadxk (28) -> hrrqb, yxfmelm, roojn\nqxqdyx (50)\nvmkib (527) -> ltccbob, lvktp, nuoic\nmwpejh (82)\ngwgchq (74)\nhjxzwnq (97)\nwisdd (75) -> vsmdkp, vzxet, jvqfj\nbsvoy (260)\npmunsu (17)\nkbvzpv (24) -> vybmch, nkwisjd, ihkcorh, bmyme, pjamo\nxlkvx (55)\nuezxhid (58) -> brapqvt, cbmkl, ijpzp, werskvv\nqoppte (52)\noxlvr (60)\nfuwekd (55)\nqgytb (10)\nvhbtdr (5)\nrtromur (217) -> qbtixl, nrphw\nmmriyf (149) -> zpkhzqb, kmegj\nnukpse (7)\nhdvcgn (56) -> tjzkwy, arouwsi\nghatw (920) -> jezubi, kpwvh, ywonug\nvcoszdq (31)\nvcauqo (166) -> hfjpir, toaan\nfenymdp (55)\nrrnkqx (41)\nbsythck (59)\nuyedi (1348) -> uxhpm, rtseps, kfkhxg, byjcsn\nxwydsz (85)\nfecwfs (20)\nvxfyyd (60)\natxfply (233) -> mckyvtt, blfinsi\nskrsezs (93)\ncncoep (72) -> bgudw, qbhvu\nawyhreh (57) -> htuuzu, eudowc, knvxq, felksho, dcjiqny\nkpwvh (146) -> kgbjthh, iljkad\ngmxdpc (42)\nxxleimo (37)\nhjbac (80)\ntwblj (191) -> tbutks, indjoox\nqbtixl (7)\nhubzsdn (102) -> zeiqoz, ukbzl\nyhadh (85) -> twqkuk, fhimhm\ninjlqnw (37) -> hmrzqlh, lmrzi\nvwmyqub (96)\nomeew (73) -> kbdnbnd, rvtus\nefsanp (33) -> loaft, wkbqm, suiagk\nfrkjf (114) -> ziyive, mdcxis\nuybuil (44) -> vabii, iawzjqd\nmjrfrb (35) -> nbhdty, lluabej\nxhrqzk (311) -> aktnest, ixoas\nyzxqqx (66) -> acbakwi, kqqegw, hmxxv\nikyzq (4037) -> oykurjk, qfsmgqe, biemun, zatfti\nakght (55)\nmbzzt (877) -> kxbmr, iivwxhd, ddumyx, kcxllz\nztpawhz (52)\nzzkusct (77) -> qrwzvrb, wnjjug\ngujegtc (27) -> bddlvs, lcjjc\nrulju (14) -> dgwrgu, iruee, awxygg\ndjodqp (82) -> tqepyv, huxtvqc, loykzr\nvrhltmp (77)\nzozcoqd (487) -> alvjc, ahism, zzkusct, tlics, rbiarxk\nymxqafr (93)\nvmttcwe (2318) -> zumdwwu, lvazjz, qhiav\nprcclw (18)\ngicwr (21)\nukwlfcf (1818) -> twblj, vpbec, wifaf\nfvhvq (32)\njvtky (25)\ntcjsqp (96)\nrdgowwr (18)\nyfwwrkp (156)\nsejncwk (626) -> sjbqzk, acfnchg, pzoaqn\nedwlns (34)\nqiund (36)\ncmenpt (53) -> ygmnsct, xwydsz\nsyojg (99) -> mwpejh, myoyl\naqbnaso (91)\novrgyv (90)\nilpjk (8)\nfvydfl (68)\nfxzqvoh (231) -> rmmxnk, vhbtdr, xmjpazn, sbbbog\nquohxia (68)\nfunabvw (153) -> vkhdfmv, igceh\nmvxud (79)\nrttwi (35) -> tcjsqp, amslmyk, vwmyqub\nyjyyq (75) -> uknqlj, trqlfrt\nulgrn (20)\nsfpnzbo (16)\niiwpsx (1466) -> coxpxpj, tlxdji, euoskfi\nrhtqj (249)\nsdjxpp (41)\nqmyohe (21)\nbljppq (30)\nzskam (845) -> tpabsyz, wynyd, gtmud, aqbnaso\niqhpby (1769) -> zlvjnx, iufvcm, nfwcuci\nbrabcb (99)\nbyvwheg (82)\nepstabj (38)\nphdeae (92) -> zwcsjgs, kdqctmq\nxyjsuy (8)\nowtswi (167)\nhtlfqi (60)\nybgdelp (24)\nehwcxy (63)\ncorcne (217)\ntlzlq (28)\nhlfmvdt (12) -> meqla, yywjam\njwmjz (5)\nsyhipz (76) -> qwror, rzsggfj, mjuyo, zitvhwp\nnfwcuci (214)\npvniw (42)\nwknmdh (836) -> thbazqq, rpbeiqg, lyvdkxe\nguvto (32)\nisispf (151) -> kvsprca, yoiej\nhasclc (46)\nkxbmr (116) -> jsdbgko, mvyzuw\nakgfzo (46) -> glblkz, lpfahc\njfssr (14)\nbxjqibv (44)\njxraf (15)\nhfwpcsa (197)\nhtuuzu (30) -> cmfcqh, xvoehjz, jabfysb, rfllomn, mvybmye, rttwi\nwfcqzm (95)\nquolxjw (84)\nrergyy (56)\nawnafxx (29)\nbzuago (99)\nytzdrvj (28)\nyoiej (65)\nffijsc (81)\nrjqjwjy (73)\nwnjjug (68)\nybnsg (78)\nygmnsct (85)\nqiaej (82)\ngzriygp (58)\nzeiqoz (14)\njqgkz (59)\niawzjqd (89)\nsxwbzyj (45)\nfaqxj (33)\ngixsbr (1173) -> qvrtwdt, wkxlf, iiwpsx, icspwbg, qhfmjrm, mspxpr, xsuxhbq\nktffksv (29)\nmfunt (165) -> quolxjw, tgwiasr\nlzevbng (16)\nazttml (15)\nhezkdc (193) -> mpieb, voawog\ndsoyvp (55) -> pfxoef, eiekcd\nildgly (137) -> pvniw, ulszlax, gtxdtf\npaaqws (214)\nchcnreg (33)\nrpyxxhm (53)\nkemxmk (332) -> umtmwow, yahsymr\nenmxpmj (64)\nowjtoo (63)\niaoxdmm (138) -> xyjsuy, fzltz\noykurjk (868) -> hkjcnv, qscadxk, phhumfd\neawwls (73)\nkiryhz (44)\njanbnmh (15)\nsbbbog (5)\nsfjyf (210) -> xpdmegi, niavkxg, eevdo, vgkjgy\nlwnlk (47)\ncthyz (62)\nwsrrryh (64)\nyahzcyp (64) -> sddoa, yscpg\nkigsmv (22)\nrubvop (31)\najgvmuy (80)\nhtwzu (16)\nxatzz (157) -> ucahbv, qiaej\nuzprj (58)\nltceq (99)\ndnqdmxc (79)\npmpxq (13)\nebyfpmf (79)\nqeuwgn (36)\nosbndxb (23)\nqunom (178) -> jxhhgvz, jjfoqtv\nxinxep (1670) -> tewltq, qtmvya, gixsbr\nclrhsr (19)\nierop (96)\nwkxlf (1022) -> drwwnwd, finxtiu, dkwwoa\nogziig (64)\nnsqiicp (27)\nfkehyrg (75)\nzielffk (23)\nupatvy (95)\njxhhgvz (16)\nswqres (26)\nndmpgss (89)\nwzvsi (69)\nihkcorh (183) -> fsjvyxv, hmemann\nelgvwug (67)\nujzxlx (98)\nveiljb (45)\nhrrqb (57)\nlrlhwat (22)\nxlkdss (7)\nqibrsjj (60)\nytjheqk (30)\nojnxwzq (2529) -> tvoptyn, yysyjbk, kqfgnql, uwrcgnq\nkbfpx (47)\nafbnq (41)\nyscpg (46)\nyatdg (50)\nacbakwi (89)\nbcedyx (37)\naktnest (5)\nfkmpv (31)\nkgbjthh (14)\ngtmud (91)\nalvjc (139) -> qdemebr, xxleimo\nyedvssr (205) -> fvkew, gicwr\nejlya (66)\nmhkrny (672) -> bezoxx, haano, pggrr\nedfxg (74)\nbmyme (95) -> wsdqchf, yhtpdwu\nuedozkm (5333) -> tntns, mkslglr, zgkxkj, sejncwk\nhsywhj (154)\nlicst (9)\ngtbocpw (60)\nvdwutc (90)\nulkdq (82)\nceutto (21)\nsivsece (73)\ntntns (1094) -> djodqp, ixuvbk, hubzsdn\nqhfmjrm (1628) -> xmhdsio, myzut, dfupxk\nrzsggfj (317) -> udlhalx, narnhty\nhlshpkq (99) -> zpuwyqp, zqaxyz\nijpzp (78)\nqtmvya (14) -> gsiokvq, wanxt, kskkjn, adtpk, iqhpby, pcehxbx\nktoxuar (83) -> eawwls, tvfptpz\nuwehdau (55)\nadvjges (20)\niuubp (62)\nencjlzj (49) -> ltceq, brabcb, uyoez\npabkgnq (10)\nulxscm (35)\nrcbhgw (832) -> jrott, hcvwov, akgfzo\nnevhjg (17)\nagtab (41) -> ztpawhz, dsiixv, gipbso, nholw\nxjbtfms (33)\nmfcutqz (219) -> ncbrxsy, bnwotj\ntxhxoib (240) -> qgytb, pabkgnq\nmiwjfr (20)\nvkmxs (75)\nhidzw (55)\nwhjbc (54)\nivhtlxa (17)\njgylf (98)\niydqii (55)\ngkitfsr (23)\ncarfsnj (79)\npxkzk (5)\nwlwnand (87)\nkhdzsr (73)\ntqepyv (16)\ngsdzpjh (40)\nwnmnz (290) -> rywggm, hpfmhy, frkjf, ojpghb, wgjst, ivldghm\nmsyvs (32) -> kyhezqn, dkegbrt, enogehk\nuusec (41)\nufdbsy (132) -> mrmuat, seuaftr\nvwupkmh (53)\npthnz (34) -> fjkfpm, uedozkm, hoqti, efgdfa\njzwusi (188) -> edagh, xrknksz, syxdt, xeege\nnpblyaq (35) -> mnfknb, jdjkbwr, aixwgk, ducdc\nmdvnu (42)\nqcglune (68)\njafsqqu (41)\nnderndc (63)\nqtshuo (44)\ntwqkuk (66)\nfcdutzs (8)\nolgmto (702) -> lbwgsap, jakmbx, aufwfrp, osnpbou\npfekvok (34)\ncbmkr (93) -> pjzcs, pavtnxe, nsoju\nigceh (36)\nblvyrzh (10) -> vdwutc, cneww, mkykc, ovrgyv\nmtxzek (136) -> kfefhun, wnpkwy\nbsxtebe (71) -> idnsypp, iqfnj\nbntzksk (37289) -> vmttcwe, ukwlfcf, zzpevgd\neudowc (1052) -> mjrfrb, uxsisng, yawmlbb, ktoxuar\nmcghosj (41)\nojpghb (156) -> prcclw, gytzi\nosrdt (79)\nvqrrii (60) -> zrgqfb, ffijsc\nwkgouh (53)\nnsvwcl (90)\neumefa (84)\nzuaamot (32)\nlxdji (8)\nzeebqts (24)\nyktye (24)\nwswnja (117) -> fnkrew, mcmzs\nvtqzf (17)\nkmnzz (5) -> wtsqx, ocqrpkf, hasclc, kqdseyh\nednlrw (56)\nyxfmelm (57)\nfgeup (36)\noiufrau (43) -> ajgvmuy, kxzwel, hjbac\nbdvtnul (26)\nxayqwyj (168) -> wvdswpz, fvaeyq\nvzxet (60)\ncvvkno (56)\nwctihs (31) -> ikicwez, wzvsi\ncpzwgk (209) -> lwnlk, xvudg\nfsoqc (24)\nhkkzpzh (14)\nwfeurd (165) -> nlrbcxx, kbbwe\nklexq (30)\nebjgfh (34)\nvctupmx (42)\npsrup (53)\nngiol (95)\nkryvxoc (18)\ntzkgrjf (54)\ngcrugvi (62)\njxhhc (17)\nwntfmtn (254) -> faqxj, qzgdlb, uurqa\nwuyjdn (95)\ndbrcg (11)\ndcwcs (42)\ndsuchz (88)\nhlykzp (31)\npwyfdan (85)\nhmemann (27)\nyjmjnm (77)\ncjcytbb (55)\nsutzt (169) -> fpdoney, nnkru, sfpnzbo\nlvazjz (39) -> zinjsj, abjmd\nbfozr (43)\ngfvzrt (84)\nwanxt (1603) -> lgqwxgu, shwsf, zvnzep, jwrmi\nfntaap (43)\ndfupxk (91)\nuxsisng (95) -> elgvwug, ssxqkhq\nrflrj (181) -> niklue, yjcggu\nnarnhty (26)\nziyive (39)\ntkvip (279)\nxjjvneg (19)\ntoaan (19)\ntgoztyw (201) -> yrnjhqc, rzldn\nnrphw (7)\nbhnwdot (50)\nnegxuk (217) -> nsqiicp, xsvage\ntyqnwi (155) -> kigpl, iwkotv\nqbhyq (98)\nqmeawpu (22)\nxjejd (88)\npvbgvb (41)\nsnsyzbk (20)\nvkile (164) -> pdkfixk, ufpdyq, lrlhwat, kigsmv\njdazgj (17)\ncdaazt (54)\nqtcnfy (50)\ngwyrtw (52)\nsgznbm (50)\ngkqxb (65) -> ioyealn, rqeftjw\nmgoym (83) -> kslvs, snyio\ncneww (90)\nfixqj (116) -> ybzqe, nhcmgrr, nevhjg\nkjmvhpa (20)\nsntbr (55)\nbnwotj (15)\nxvudg (47)\nltyxiwk (53)\nbrapqvt (78)\nzrmzpo (95)\nxcdswr (85)\nerngeah (44)\nzvogn (8)\nranlxct (59)\noztxjfl (239) -> eukyl, pjpbcq\nbcrso (24)\nogtxa (89) -> iuubp, gcrugvi, cthyz, zzlocxd\nutpyp (35)\nrmmxnk (5)\nnogoyp (70) -> rdgowwr, kryvxoc\nafqwh (30)\nnedjj (54)\nlyvdkxe (42) -> ssblis, gmrkqq\nybzqe (17)\nbnvjfq (34)\nsklld (24)\neqkio (2131) -> eefmcrp, cmenpt, wswnja\nqypsl (54)\nwcfykko (60)\nluiiv (898) -> vgnkq, coenr, paaqws\nmjpmw (101) -> lomxh, rqvifq\nwswwck (40) -> zmdvl, yatdg, sgznbm\nyjcggu (18)\npjpbcq (22)\nyahsymr (30)\nliwvq (1960) -> axqifwm, qunom, euxvn, efsanp\neuoskfi (135) -> nnpvdm, jwmjz\nhpfmhy (176) -> fuexyx, fcdutzs\njczkx (55)\njvwfxp (330) -> cvcyykp, hlykzp\npyscsi (64)\njevfpj (65)\nzitvhwp (75) -> tpbcg, ujzxlx, qbhyq\nsndject (5)\naufwfrp (53) -> mmprixv, ejlya\nriogonj (346)\ndhecgkl (73)\neevdo (16)\nkslvs (42)\nzpuktmx (37)\nnbkzscx (9)\npbvcu (73)\nzwymlsj (118) -> tcpvyfj, rtiaapt, xikbq, gldvef\nfzbwmsz (187) -> dbrcg, wkkkv, mznsk, etkzf\ntmtfhr (30)\neukyl (22)\nhmugaom (156)\nixuvbk (130)\nsantsu (76)\nbuplpb (26) -> negxuk, imuhew, izssdb\nimuhew (77) -> yauryvu, kjtwz\nniklue (18)\nzuzhmf (137) -> pbvcu, sivsece\nlgqwxgu (202)\nemxwr (262) -> nedjj, hwfcy\niqfnj (94)\nixyeq (273) -> pxkzk, ylfvgv\nwvgzlw (87) -> hidzw, vofrtf, yvllxxw\nkbbwe (41)\njcsjaxj (2792) -> buplpb, slntf, kqohkg\ntlxdji (145)\nhgaoiz (283)\ntgwiasr (84)\newyrp (259) -> jevqne, ilpjk, kmpmdb\nkmegj (50)\naxqifwm (98) -> dasmiiw, wyiec\njrrhzc (5)\ncftggo (20)\nxvoyybs (56) -> ygvvvq, kemxmk, jkfrln, arjgn, fvsitx, lfrfa, jvwfxp\ndaiaot (60)\navemxf (63)\nyzpyzu (41)\nwtbst (73)\nseuaftr (21)\ndgwrgu (89)\nkpffozq (27)\nqoeviy (129) -> yxvmxzg, bfxvxpl\nuwprsvh (1502) -> qjkkohe, pctkyat\nldvcrw (299) -> clrhsr, elmmtp\nyywjam (86)\nelmmtp (19)\ncoenr (56) -> edyohkw, vspquqe\nkhixwdd (54) -> vxfyyd, dltbolj, htlfqi\njsdbgko (73)\nllepsqz (96)\nsmqtcaj (250) -> daiaot, lswutyd\nthbazqq (180) -> pmunsu, vtqzf\nkaitdu (98)\nfvaeyq (34)\nglblkz (97)\nvmofl (39) -> eumefa, gfvzrt\ndqktd (95)\nmwvbcqg (58)\ngbwfjf (777) -> tkvip, mbcwjt, sbimooe\nhmxxv (89)\nwynyd (91)\njdjkbwr (41)\nelxccty (54) -> fvydfl, qcglune\nbnmuprs (41)\nkgfudu (45) -> otsyp, sdixs, whjbc, cdaazt\nhfjtksr (39)\ntlgdija (81) -> fntaap, zlxlwv\nqrwzvrb (68)\nnchgm (49)\ngofjvi (67)\njjfoqtv (16)\ntfbqaoe (53)\nzzqtmxd (116) -> fecwfs, eigsdc\nqhktzou (75)\nwydtqax (45)\nytyhmux (84)\nqqkqhzb (274)\ntrqlfrt (92)\neivaf (370)\nnjlaepf (47)\nbkmepbs (46)\nmpieb (34)\nsbimooe (89) -> dqktd, bnmsz\ndltbolj (60)\nlvktp (32) -> prnno, qxsjs, wuyjdn\nlcius (54)\nmxelfv (75)\nhrwtz (17) -> mocpa, fixysjm, cjkieim\njzcstbe (236)\nmikalda (35)\nxrknksz (12)\nknfath (32)\npmssap (99)\neefmcrp (209) -> nukpse, xlkdss\nnkwisjd (149) -> pfltnc, fblsn\nragcph (38)\neubjf (58)\nsnyio (42)\nzquvn (108) -> nvrpd, dlrznye\nuakxuru (169) -> zhpdhat, uymdj\negrit (73)\ndlvttmo (95)\nxikbq (18)\nxgmrufk (56)\ncbmkl (78)\njqwaifx (24)\nqowepn (33)\nclizzo (227) -> dfrzb, zjxjhwc\ntbakk (935) -> wctihs, vszpkfs, iqtdzrh\nqvzjgne (36) -> dlvttmo, wfcqzm, mfslhp\nmvybmye (207) -> awnafxx, xqrrpu, ktffksv, csbgxs\nmkslglr (189) -> dmkhzgg, sykmuwo, bsxtebe, yjyyq, znmav\njkfrln (342) -> jbhohbx, jvtky\nznswber (40)\nrqvifq (53)\nfnkrew (53)\njabfysb (91) -> gzriygp, eubjf, qluzb, ugplhkq\ndresofi (346)\nzpkhzqb (50)\nhwraaxu (89) -> majskr, nchgm\nuebmnqa (88) -> ymxqafr, skrsezs\nqeoetnp (173) -> evvfcyi, pmpxq\nsddoa (46)\nqdemebr (37)\nkobwktw (62)\nfogmaih (75)\nwgevvca (79)\nphhumfd (35) -> ulkdq, ulvbf\nzpuwyqp (59)\ntxdprek (83) -> gsbmh, iizpgi\ncqmvs (14) -> bntzksk, mvpqv, pthnz, xinxep, qnhvjec, znztzxd, silwwua\nwazlg (92)\nunpdcwm (153) -> yktye, sklld, tdrdq\nuknqlj (92)\nqwror (369)\nawxygg (89)\nuwrcgnq (1176) -> uybuil, vqrrii, arejh\nnvrpd (83)\nznuldtj (30)\nwxyaqte (27)\nxbywgft (55)\niwidsj (95)\nkcxllz (43) -> mdlubuq, dhecgkl, uvpwrf\narejh (188) -> lbkrk, jxhhc\nqbaig (84)\nmvpqv (5522) -> ojnxwzq, qlchz, awyhreh, ikyzq\nlpfahc (97)\nfadkfic (36)\nxvwgxm (63) -> wazlg, vmkfcpw\ntewltq (4134) -> cviwy, wknmdh, bcnqhw, vmkib, ezaobs, gewlsr, yevywe\nrfwgt (78)\nwsjizsy (33) -> bsiwtqq, uzprj, mwvbcqg\nrbbkdj (191) -> rjqjwjy, egrit\ncwwwcge (20)\nejbtu (58) -> qnepf, dsuchz\nhefjuue (24)\ncoxpxpj (5) -> cbgnzhz, uofuvf\nnhcmgrr (17)\niktev (194) -> chcnreg, olnfe\nvhnnnv (79)\nkmwkft (88) -> edfxg, xaovjvs\nkdqctmq (7)\nslntf (309) -> dmxlfzb, phdeae, vfdulx, bzorz, nogoyp\nohqivu (82) -> yjmjnm, taxky\nlqasevp (26)\nroojn (57)\nojrixty (97)\nxmjpazn (5)\nsalxel (5)\nlhlgijf (54)\nzatfti (60) -> phkzo, ghqixh, rulju, ksnxlcl, isispf\nznmav (95) -> byvwheg, kefudoj\nmyzut (91)\ncekchxh (59) -> lcwqdxx, nkdbmjv, pfekvok\nukbzl (14)\nbwrpc (41) -> jzbnq, fezoyaj, birtjxh, fcjjqev\nytadaxm (26) -> nlkwsrn, qtcnfy\nqlryl (10)\nvytlfm (33)\njswxshd (127) -> teapi, ugssydn\nemqwt (50)\nugssydn (35)\niumsmx (20)\nkigpl (89)\ncdfij (68)\nesmbu (8)\nizpta (84)\njviven (416) -> gujegtc, owtswi, haayebg, yjcevge, mgoym, iqckb, gkqxb\nqhiav (99)\nixoas (5)\ndmxlfzb (16) -> afqwh, klexq, tiyvea\nredeub (57) -> hxhguzh, vkmxs\nfymyi (35)\nmdcxis (39)\nlcjjc (70)\nacfnchg (246) -> advjges, cftggo\nldkojcj (8)\nnwlkk (84)\nkzocw (2306) -> umsrz, mbzzt, uilvahq\nmeqla (86)\ndrwwnwd (139) -> vrhltmp, njaig\nvspquqe (79)\nuymdj (76)\neutun (192) -> iumsmx, snsyzbk, wkxyxtf\nezaobs (434) -> lngdxkd, brmvw, hdvcgn, ufdbsy, qsxqwub, rkswk\niljkad (14)\nryeiot (41)\nmwhraq (86) -> lwysj, lmgxknk";
