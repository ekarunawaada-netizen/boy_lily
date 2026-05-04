
const chalk = require('chalk')
const fs = require('fs')

global.allmenu = (prefix, hituet) => {
	return `
\`Hai Kak ${pushname}\`🎗

◤───「 \`INFO USER\` 」──✦
> ⎆  [ Nama : ${pushname}
> ⎆  [ Role : ${DinzTheCreator ? 'Boss🥇' : isPrem ? 'Investor💵' : 'Gratisan😩'}
> ⎆  [ Mode : ${DinzBotz.public ? 'Public' : 'Private'}
> ⎆  [ Author : ${global.ownername}
◣──────────❈

◤───「 \`INFO BOT\` 」──✦
> ⎆ Runtime : ${runtime(process.uptime())}
> ⎆ Versi : ${global.version}
> ⎆ Respon : ${latensi.toFixed(4)}
◣─────────────✦

*_Jangan Di Spam Ya Agar Botnya Bisa Aktif 24 Jam Dan Tidak Terkena Blokir Spam🍁_*

◤─「 \`OWNER MENU\` 」─✦
│⦿ 〔 _.autoread_
│⦿ 〔 _.upchv2_
│⦿ 〔 _.addsewa_
│⦿ 〔 _.delwa_
│⦿ 〔 _.onlypc_
│⦿ 〔 _.onlygc_
│⦿ 〔 _.self_
│⦿ 〔 _.clearchat_
│⦿ 〔 _.pinchat_
│⦿ 〔 _.unpinchat_
│⦿ 〔 _.gconly_ 
│⦿ 〔 _.public_ 
│⦿ 〔 _.setpppanjang_ 
│⦿ 〔 _.setppgcpanjang_ 
│⦿ 〔 _.addcase_
│⦿ 〔 _.join_ 
│⦿ 〔 _.bctext_ 
│⦿ 〔 _.poll_ 
│⦿ 〔 _.bcimage_
│⦿ 〔 _.bcvideo_
│⦿ 〔 _.creategc_
│⦿ 〔 _.setexif_
│⦿ 〔 _.userjid_
│⦿ 〔 _.setbotname_
│⦿ 〔 _.setbotbio_
│⦿ 〔 _.delppbot_
│⦿ 〔 _.restart_
│⦿ 〔 _.setppbot_
│⦿ 〔 _.addprem_
│⦿ 〔 _.delprem_
│⦿ 〔 _.addowner_
│⦿ 〔 _.delowner_
│⦿ 〔 _.addvn_
│⦿ 〔 _.delvn_
│⦿ 〔 _.addsticker_
│⦿ 〔 _.delsticker_
│⦿ 〔 _.addimage_
│⦿ 〔 _.delimage_
│⦿ 〔 _.addvideo_
│⦿ 〔 _.delvideo_
│⦿ 〔 _.block_
│⦿ 〔 _.unblock del_
│⦿ 〔 _.leavegc_
│⦿ 〔 _.pushkontak_
│⦿ 〔 _.pushkontakv2_
│⦿ 〔 _.pushkontakv3_
│⦿ 〔 _.pushkontakv4_
│⦿ 〔 _.savekontakv_
│⦿ 〔 _.savekontakv2_
│⦿ 〔 _.getkontak_
│⦿ 〔 _.sendkontak_
│⦿ 〔 _.jpm_
│⦿ 〔 _.jpm2_
◣──────────❈
◤─「 \`STORE MENU\` 」─✦ 
│⦿ 〔 _.list_
│⦿ 〔 _.addlist_
│⦿ 〔 _.dellist_
│⦿ 〔 _.update_
│⦿ 〔 _.jeda_
│⦿ 〔 _.tambah_
│⦿ 〔 _.kurang_
│⦿ 〔 _.kali_
│⦿ 〔 _.bagi_
│⦿ 〔 _.delsetdone_
│⦿ 〔 _.changedone_
│⦿ 〔 _.setdone_
│⦿ 〔 _.delproses_
│⦿ 〔 _.changeproses_
│⦿ 〔 _.setproses_
│⦿ 〔 _.proses <reply chat>_
│⦿ 〔 _.done <reply chat>_
◣──────────❈
◤─「 \`NEW UPDATE\` 」─✦
│⦿ 〔 _.nglspam_
│⦿ 〔 _.bratvideo_
│⦿ 〔 _.chord_
│⦿ 〔 _.nulishitam_
│⦿ 〔 _.readmore_
│⦿ 〔 _.mcmap_
│⦿ 〔 _.aigen_
│⦿ 〔 _.romchat_
│⦿ 〔 _.animebrat_
│⦿ 〔 _.animebrat-vid_
│⦿ 〔 _.totalchat_
│⦿ 〔 _.hytamkan_ 
│⦿ 〔 _.totalfitur_
│⦿ 〔 _.superhd_
│⦿ 〔 _.youtubestalk_
│⦿ 〔 _.carimusic_
│⦿ 〔 _.antitagsw_
│⦿ 〔 _.enchard_
│⦿ 〔 _.buatlogo_
│⦿ 〔 _.chat_
│⦿ 〔 _.upch_
◣──────────❈
◤─「 \`CHAR AI\` 」─✦
│⦿ 〔 _.hutao-cai_
│⦿ 〔 _.kurumi-cai_
│⦿ 〔 _.elaina-cai_
◣──────────❈
◤─「 \`FITUR FIX\` 」─✦
│⦿ 〔 _.nulis_
│⦿ 〔 _.sertifikatmenu_
│⦿ 〔 _.jadianime_
│⦿ 〔 _.hdvid_
│⦿ 〔 _.ytplay_
│⦿ 〔 _.removebg_
│⦿ 〔 _.terabox_
│⦿ 〔 _.ytmp3_
│⦿ 〔 _.hd_
│⦿ 〔 _.mediafire_
│⦿ 〔 _.xnxxsearch_
│⦿ 〔 _.cuaca_
│⦿ 〔 _.bratvideo_
│⦿ 〔 _.myip_
│⦿ 〔 _.welcome2_
│⦿ 〔 _.reactch_
◣──────────❈
◤─「 \`ISLAM MENU\` 」─✦
│⦿ 〔 _.kisahnabi_
│⦿ 〔 _.asmaulhusna_
│⦿ 〔 _.bacaansholat_
│⦿ 〔 _.audiosurah_
│⦿ 〔 _.ayatkursi_
│⦿ 〔 _.doaharian_
│⦿ 〔 _.niatsholat_
│⦿ 〔 _.quotes_
│⦿ 〔 _.sholat_
│⦿ 〔 _.doatahlil_
│⦿ 〔 _.tafsir_
│⦿ 〔 _.jadwalsholat_
◣──────────❈
◤─「 \`GROUP MENU\` 」─✦
│⦿ 〔 _.sider_
│⦿ 〔 _.autoaigc_
│⦿ 〔 _.warcall_
│⦿ 〔 _.autosimi_
│⦿ 〔 _.yoimiyachat_
│⦿ 〔 _.mute_
│⦿ 〔 _.welcome on/off_
│⦿ 〔 _.antilink_
│⦿ 〔 _.antiwame_
│⦿ 〔 _.linkgc_
│⦿ 〔 _.invite_
│⦿ 〔 _.ephemeral_
│⦿ 〔 _.delete_
│⦿ 〔 _.setppgroup_
│⦿ 〔 _.delppgroup_
│⦿ 〔 _.setname_
│⦿ 〔 _.setdesc_
│⦿ 〔 _.add_
│⦿ 〔 _.kick_
│⦿ 〔 _.promote_
│⦿ 〔 _.demote_
│⦿ 〔 _.hidetag_
│⦿ 〔 _.totag_
│⦿ 〔 _.tagall_
│⦿ 〔 _.editinfo_
│⦿ 〔 _.opentime_
│⦿ 〔 _.closetime_
│⦿ 〔 _.resetlink_
│⦿ 〔 _.getbio_
│⦿ 〔 _.vote_
│⦿ 〔 _.upvote_
│⦿ 〔 _.downvote_
│⦿ 〔 _.checkvote_
│⦿ 〔 _.delvote_
│⦿ 〔 _.autostickergc_
│⦿ 〔 _.antilinkgc_
│⦿ 〔 _.antiwame_
│⦿ 〔 _.antilinkall_
│⦿ 〔 _.antilinktiktok_
│⦿ 〔 _.antilinkfb_
│⦿ 〔 _.antilinktwitter_
│⦿ 〔 _.antilinkig_
│⦿ 〔 _.antilinktg_
│⦿ 〔 _.antilinkytvid_
│⦿ 〔 _.antilinkytch_
│⦿ 〔 _.antivirus_
│⦿ 〔 _.antitoxic_
│⦿ 〔 _.nsfw_
│⦿ 〔 _.react_
◣──────────❈
◤─「 \`ANONYMOUS\` 」─✦
│⦿ 〔 _.anonymouschat_
│⦿ 〔 _.start_
│⦿ 〔 _.next_
│⦿ 〔 _.stop_
│⦿ 〔 _.sendprofile_
│⦿ 〔 _.menfess_
│⦿ 〔 _.confess_
│⦿ 〔 _.balasmenfess_
│⦿ 〔 _.tolakmenfess_
│⦿ 〔 _.stopmenfess_
◣──────────❈
◤─「 \`PUSH MENU\` 」─✦
│⦿ 〔 _.cekidgc_
│⦿ 〔 _.pushkontak_
│⦿ 〔 _.pushkontakv2_
│⦿ 〔 _.pushkontakv3_
│⦿ 〔 _.pushkontakv4_
│⦿ 〔 _.savekontakv_
│⦿ 〔 _.savekontakv2_
│⦿ 〔 _.getkontak_
│⦿ 〔 _.sendkontak_
│⦿ 〔 _.jpm_
│⦿ 〔 _.jpm2_
◣──────────❈
◤─「 \`CPANEL MENU\` 」─✦
│⦿ 〔 _.listusr_
│⦿ 〔 _.delusr_
│⦿ 〔 _.listsrv_
│⦿ 〔 _.delsrv_
│⦿ 〔 _.tutorial_
│⦿ 〔 _.ramlist_
│⦿ 〔 _.premlist_
│⦿ 〔 _.updatesrv_
│⦿ 〔 _.suspend_
│⦿ 〔 _.unsuspend_
│⦿ 〔 _.createadmin_
│⦿ 〔 _.listadmin_
◣──────────❈
◤─「 \`DOWNLOAD MENU\` 」─✦
│⦿ 〔 _.tiktok_
│⦿ 〔 _.tiktokslide_
│⦿ 〔 _.videy_
│⦿ 〔 _.tiktokaudio_
│⦿ 〔 _.filmsearch_
│⦿ 〔 _.ytsearch <mp3>_
│⦿ 〔 _.ytsearch2 <mp4>_
│⦿ 〔 _.ttsearch_
│⦿ 〔 _.teraboxdl_
│⦿ 〔 _.snackvideo_
│⦿ 〔 _.capcutdl_
│⦿ 〔 _.play_
│⦿ 〔 _.playyt_
│⦿ 〔 _.ytplay (link youtubenya)_
│⦿ 〔 _.playspotify_
│⦿ 〔 _.ytmp3_
│⦿ 〔 _.ytmp4_
│⦿ 〔 _.google_
│⦿ 〔 _.imdb_
│⦿ 〔 _.weather_
│⦿ 〔 _.cuaca_
│⦿ 〔 _.wanumber_
│⦿ 〔 _.instagram_
│⦿ 〔 _.facebook_
│⦿ 〔 _.twittervid_
│⦿ 〔 _.spotify_
│⦿ 〔 _.gitclone_
│⦿ 〔 _.happymod_
│⦿ 〔 _.gdrive_
│⦿ 〔 _.pinterest_
│⦿ 〔 _.ringtone_
◣──────────❈
◤─「 \`GAME MENU\` 」─✦
│⦿ 〔 _.tebakkata_
│⦿ 〔 _.tebaktebakan_
│⦿ 〔 _.tebaklirik_
│⦿ 〔 _.tebakgambar_
│⦿ 〔 _.tebaklagu_
│⦿ 〔 _.tebakkimia_
│⦿ 〔 _.asahotak_
│⦿ 〔 _.siapaaku_
│⦿ 〔 _.susunkata_
│⦿ 〔 _.tekateki_
│⦿ 〔 _.tebakbendera_
│⦿ 〔 _.tebakhewan_
│⦿ 〔 _.tebakmakanan_
│⦿ 〔 _.tebaknegara_
│⦿ 〔 _.tebakjkt48_
│⦿ 〔 _.tebakprofesi_
│⦿ 〔 _.tebakepep_
│⦿ 〔 _.tebakdrakor_
│⦿ 〔 _.tebakfilm_
│⦿ 〔 _.riddle_
│⦿ 〔 _.nyerah_
◣──────────❈
◤─「 \`RPG MENU\` 」─✦
│⦿ 〔 _.kerja_
│⦿ 〔 _.fightnaga_
│⦿ 〔 _.fightkucing_
│⦿ 〔 _.fightphonix_
│⦿ 〔 _.fightgriffin_
│⦿ 〔 _.fightkyubi_
│⦿ 〔 _.fightcentaur_
│⦿ 〔 _.nabung_
│⦿ 〔 _.mining_
│⦿ 〔 _.bankcek_
│⦿ 〔 _.maling_
│⦿ 〔 _.banknabung_
│⦿ 〔 _.banktarik_
│⦿ 〔 _.berkebon_
│⦿ 〔 _.crafting_
│⦿ 〔 _.bet_
│⦿ 〔 _.bonus_
│⦿ 〔 _.buah_
│⦿ 〔 _.nebang_
│⦿ 〔 _.bekerja_
│⦿ 〔 _.bansos_
│⦿ 〔 _.taxy_
│⦿ 〔 _.mulung_
│⦿ 〔 _.berburu_
│⦿ 〔 _.polisi_
│⦿ 〔 _.berdagang_
│⦿ 〔 _.rampok_
│⦿ 〔 _.bunuh_
│⦿ 〔 _.collect_
│⦿ 〔 _.mancing_
│⦿ 〔 _.repair_
│⦿ 〔 _.feed_
│⦿ 〔 _.fight_
│⦿ 〔 _.gajian_
│⦿ 〔 _.upgrade_
│⦿ 〔 _.transfer_
│⦿ 〔 _.shop_
│⦿ 〔 _.selectskill_
│⦿ 〔 _.sampah_
│⦿ 〔 _.roket_
│⦿ 〔 _.ojek_
│⦿ 〔 _.nguli_
│⦿ 〔 _.pasar_
│⦿ 〔 _.rob_
│⦿ 〔 _.referal_
│⦿ 〔 _.petshop_
│⦿ 〔 _.kolam_
│⦿ 〔 _.koboy_
│⦿ 〔 _.leaderboard_
│⦿ 〔 _.casino_
◣──────────❈
◤─「 \`QUOTES MENU\` 」─✦
│⦿ 〔 _.quotesanime_ 
│⦿ 〔 _.quotesbacot_ 
│⦿ 〔 _.quotesbucin_ 
│⦿ 〔 _.quotesmotivasi_ 
│⦿ 〔 _.quotesgalau_ 
│⦿ 〔 _.quotesgombal_ 
│⦿ 〔 _.quoteshacker_ 
│⦿ 〔 _.quotesbijak_ 
◣──────────❈
◤─「 \`RANDOM VIDEO\` 」─✦
│⦿ 〔 _.tiktokgirl_
│⦿ 〔 _.tiktoknukthy_
│⦿ 〔 _.tiktokkayes_
│⦿ 〔 _.tiktokpanrika_
│⦿ 〔 _.tiktoknotnot_
│⦿ 〔 _.tiktokghea_
│⦿ 〔 _.tiktoksantuy_
│⦿ 〔 _.tiktokbocil_
◣──────────❈
◤─「 \`STALK MENU\` 」─✦
│⦿ 〔 _.igstalk_
│⦿ 〔 _.ttstalk_
│⦿ 〔 _.ffstalk_
│⦿ 〔 _.mlstalk_
│⦿ 〔 _.npmstalk_
│⦿ 〔 _.ghstalk_
◣──────────❈
◤─「 \`OPEN AI\` 」─✦
│⦿ 〔 _.leptonai_
│⦿ 〔 _.openai_
│⦿ 〔 _.ai_
│⦿ 〔 _.hutaoai_
│⦿ 〔 _.bard_
│⦿ 〔 _.prodia_
│⦿ 〔 _.diffusion-anime_
│⦿ 〔 _.travel-assistant_
│⦿ 〔 _.ocr_
│⦿ 〔 _.guru-ai_
│⦿ 〔 _.emi-ai_
│⦿ 〔 _.claude-ai_
│⦿ 〔 _.costume-ai_
│⦿ 〔 _.herc-ai_
│⦿ 〔 _.hercai-cartoon_
│⦿ 〔 _.hercai-animefy_
│⦿ 〔 _.hercai-lexica_
│⦿ 〔 _.hercai-prodia_
│⦿ 〔 _.hercai-simurg_
│⦿ 〔 _.hercai-raava_
│⦿ 〔 _.hercai-shonin_
│⦿ 〔 _.realistic_
│⦿ 〔 _.3dmodel_
│⦿ 〔 _.jadizombie_
│⦿ 〔 _.blackboxai_
│⦿ 〔 _.photoleapai_
│⦿ 〔 _.diffusion_
│⦿ 〔 _.indo-ai_
│⦿ 〔 _.lamaai_
│⦿ 〔 _.aivo_
│⦿ 〔 _.gemini_
│⦿ 〔 _.text2img_
│⦿ 〔 _.absolutely_
│⦿ 〔 _.dalle_
│⦿ 〔 _.bingimg_
│⦿ 〔 _.bingai_
│⦿ 〔 _.gptimg_
│⦿ 〔 _.gpt4_
│⦿ 〔 _.gpt4_2_
│⦿ 〔 _.anything_
│⦿ 〔 _.hdvid_
│⦿ 〔 _.cai_
│⦿ 〔 _.youai_
│⦿ 〔 _.remini_
│⦿ 〔 _.jadianime_
│⦿ 〔 _.removebg_
│⦿ 〔 _.nulis_
◣──────────❈
◤─「 \`FUN MENU\` 」─✦
│⦿ 〔 _.smeme_
│⦿ 〔 _.ppcouple_
│⦿ 〔 _.define_
│⦿ 〔 _.qc_
│⦿ 〔 _.qcwarna_
│⦿ 〔 _.kodeqc_
│⦿ 〔 _.lyrics_
│⦿ 〔 _.suit_
│⦿ 〔 _.math_
│⦿ 〔 _.tictactoe_
│⦿ 〔 _.fact_
│⦿ 〔 _.truth_
│⦿ 〔 _.dare_
│⦿ 〔 _.couple_
│⦿ 〔 _.soulmate_
│⦿ 〔 _.stupidcheck_
│⦿ 〔 _.handsomecheck_
│⦿ 〔 _.uncleancheck_
│⦿ 〔 _.hotcheck_
│⦿ 〔 _.smartcheck_
│⦿ 〔 _.greatcheck_
│⦿ 〔 _.evilcheck_
│⦿ 〔 _.dogcheck_
│⦿ 〔 _.coolcheck_
│⦿ 〔 _.waifucheck_
│⦿ 〔 _.awesomecheck_
│⦿ 〔 _.gaycheck_
│⦿ 〔 _.cutecheck_
│⦿ 〔 _.lesbiancheck_
│⦿ 〔 _.hornycheck_
│⦿ 〔 _.prettycheck_
│⦿ 〔 _.lovelycheck_
│⦿ 〔 _.uglycheck_
│⦿ 〔 _.pick_
│⦿ 〔 _.quotes_
│⦿ 〔 _.can_
│⦿ 〔 _.is_
│⦿ 〔 _.when_
│⦿ 〔 _.where_
│⦿ 〔 _.what_
│⦿ 〔 _.how_
│⦿ 〔 _.rate_
│⦿ 〔 _.cry_
│⦿ 〔 _.kill_
│⦿ 〔 _.hug_
│⦿ 〔 _.pat_
│⦿ 〔 _.lick_
│⦿ 〔 _.kiss_
│⦿ 〔 _.bite_
│⦿ 〔 _.yeet_
│⦿ 〔 _.bully_
│⦿ 〔 _.bonk_
│⦿ 〔 _.wink_
│⦿ 〔 _.poke_
│⦿ 〔 _.nom_
│⦿ 〔 _.slap_
│⦿ 〔 _.smile_
│⦿ 〔 _.wave_
│⦿ 〔 _.awoo_
│⦿ 〔 _.blush_
│⦿ 〔 _.smug_
│⦿ 〔 _.glomp_
│⦿ 〔 _.happy_
│⦿ 〔 _.dance_
│⦿ 〔 _.cringe_
│⦿ 〔 _.cuddle_
│⦿ 〔 _.highfive_
│⦿ 〔 _.shinobu_
│⦿ 〔 _.handhold_
│⦿ 〔 _.tickle_
│⦿ 〔 _.avatar_
│⦿ 〔 _.feed_
│⦿ 〔 _.foxgirl_
│⦿ 〔 _.gecg_
│⦿ 〔 _.checkme_
│⦿ 〔 _.sound1 - sound161_
◣──────────❈
◤─「 \`RANDOM PHOTO\` 」─✦
│⦿ 〔 _.aesthetic_
│⦿ 〔 _.coffee_
│⦿ 〔 _.wikimedia_
│⦿ 〔 _.wallpaper_
│⦿ 〔 _.art_
│⦿ 〔 _.bts_
│⦿ 〔 _.dogwoof_
│⦿ 〔 _.catmeow_
│⦿ 〔 _.lizardpic_
│⦿ 〔 _.goosebird_
│⦿ 〔 _.8ballpool_
│⦿ 〔 _.cosplay_
│⦿ 〔 _.hacker_
│⦿ 〔 _.cyber_
│⦿ 〔 _.gamewallpaper_
│⦿ 〔 _.islamic_
│⦿ 〔 _.jennie_
│⦿ 〔 _.jiso_
│⦿ 〔 _.satanic_
│⦿ 〔 _.justina_
│⦿ 〔 _.cartoon_
│⦿ 〔 _.pentol_
│⦿ 〔 _.cat_
│⦿ 〔 _.kpop_
│⦿ 〔 _.exo_
│⦿ 〔 _.lisa_
│⦿ 〔 _.space_
│⦿ 〔 _.car_
│⦿ 〔 _.technology_
│⦿ 〔 _.bike_
│⦿ 〔 _.shortquote_
│⦿ 〔 _.antiwork_
│⦿ 〔 _.hacking_
│⦿ 〔 _.boneka_
│⦿ 〔 _.rose_
│⦿ 〔 _.ryujin_
│⦿ 〔 _.ulzzangboy_
│⦿ 〔 _.ulzzanggirl_
│⦿ 〔 _.wallml_
│⦿ 〔 _.wallphone_
│⦿ 〔 _.mountain_
│⦿ 〔 _.goose_
│⦿ 〔 _.profilepic_
│⦿ 〔 _.couplepic_
│⦿ 〔 _.programming_
│⦿ 〔 _.pubg_
│⦿ 〔 _.blackpink_
│⦿ 〔 _.randomboy_
│⦿ 〔 _.randomgirl_
│⦿ 〔 _.hijab_
│⦿ 〔 _.chinese_
│⦿ 〔 _.indo_
│⦿ 〔 _.japanese_
│⦿ 〔 _.korean_
│⦿ 〔 _.malay_
│⦿ 〔 _.thai_
│⦿ 〔 _.vietnamese_
◣──────────❈
◤─「 \`STICKER\` 」─✦
│⦿ 〔 _.goose_
│⦿ 〔 _.woof_
│⦿ 〔 _.8ball_
│⦿ 〔 _.lizard_
│⦿ 〔 _.meow_
│⦿ 〔 _.gura_
│⦿ 〔 _.doge_
│⦿ 〔 _.patrick_
│⦿ 〔 _.lovestick_
◣──────────❈
◤─「 \`ANIME\` 」─✦
│⦿ 〔 _.akira_
│⦿ 〔 _.akiyama_
│⦿ 〔 _.ana_
│⦿ 〔 _.asuna_
│⦿ 〔 _.ayuzawa_
│⦿ 〔 _.boruto_
│⦿ 〔 _.chiho_
│⦿ 〔 _.chitoge_
│⦿ 〔 _.cosplayloli_
│⦿ 〔 _.cosplaysagiri_
│⦿ 〔 _.deidara_
│⦿ 〔 _.doraemon_
│⦿ 〔 _.elaina_
│⦿ 〔 _.emilia_
│⦿ 〔 _.erza_
│⦿ 〔 _.gremory_
│⦿ 〔 _.hestia_
│⦿ 〔 _.hinata_
│⦿ 〔 _.husbu_
│⦿ 〔 _.inori_
│⦿ 〔 _.isuzu_
│⦿ 〔 _.itachi_
│⦿ 〔 _.itori_
│⦿ 〔 _.kaga_
│⦿ 〔 _.kagura_
│⦿ 〔 _.kakasih_
│⦿ 〔 _.kaori_
│⦿ 〔 _.keneki_
│⦿ 〔 _.kotori_
│⦿ 〔 _.kurumi_
│⦿ 〔 _.loli_
│⦿ 〔 _.madara_
│⦿ 〔 _.megumin_
│⦿ 〔 _.mikasa_
│⦿ 〔 _.mikey_
│⦿ 〔 _.miku_
│⦿ 〔 _.minato_
│⦿ 〔 _.naruto_
│⦿ 〔 _.neko_
│⦿ 〔 _.neko2_
│⦿ 〔 _.nekonime_
│⦿ 〔 _.nezuko_
│⦿ 〔 _.onepiece_
│⦿ 〔 _.pokemon_
│⦿ 〔 _.randomnime_
│⦿ 〔 _.randomnime2_
│⦿ 〔 _.rize_
│⦿ 〔 _.sagiri_
│⦿ 〔 _.sakura_
│⦿ 〔 _.sasuke_
│⦿ 〔 _.shina_
│⦿ 〔 _.shinka_
│⦿ 〔 _.shinomiya_
│⦿ 〔 _.shizuka_
│⦿ 〔 _.shota_
│⦿ 〔 _.tejina_
│⦿ 〔 _.toukachan_
│⦿ 〔 _.tsunade_
│⦿ 〔 _.waifu_
│⦿ 〔 _.animewall_
│⦿ 〔 _.yotsuba_
│⦿ 〔 _.yuki_
│⦿ 〔 _.yulibocil_
│⦿ 〔 _.yumeko_
│⦿ 〔 _.8ball_
│⦿ 〔 _.tickle_
│⦿ 〔 _.gecg_
│⦿ 〔 _.feed_
│⦿ 〔 _.animeawoo_
│⦿ 〔 _.animemegumin_
│⦿ 〔 _.animeshinobu_
│⦿ 〔 _.animehandhold_
│⦿ 〔 _.animehighfive_
│⦿ 〔 _.animecringe_
│⦿ 〔 _.animedance_
│⦿ 〔 _.animehappy_
│⦿ 〔 _.animeglomp_
│⦿ 〔 _.animeblush_
│⦿ 〔 _.animesmug_
│⦿ 〔 _.animewave_
│⦿ 〔 _.animesmile_
│⦿ 〔 _.animepoke_
│⦿ 〔 _.animewink_
│⦿ 〔 _.animebonk_
│⦿ 〔 _.animebully_
│⦿ 〔 _.animeyeet_
│⦿ 〔 _.animebite_
│⦿ 〔 _.animelick_
│⦿ 〔 _.animekill_
│⦿ 〔 _.animecry_
│⦿ 〔 _.animewlp_
│⦿ 〔 _.animekiss_
│⦿ 〔 _.animehug_
│⦿ 〔 _.animeneko_
│⦿ 〔 _.animepat_
│⦿ 〔 _.animeslap_
│⦿ 〔 _.animecuddle_
│⦿ 〔 _.animewaifu_
│⦿ 〔 _.animenom_
│⦿ 〔 _.animefoxgirl_
│⦿ 〔 _.animegecg_
│⦿ 〔 _.animetickle_
│⦿ 〔 _.animefeed_
│⦿ 〔 _.animeavatar_
│⦿ 〔 _.genshin_
│⦿ 〔 _.anime_
│⦿ 〔 _.amv_
◣──────────❈
◤─「 \`NSFW MENU\` 」─✦
│⦿ 〔 _.hentai_
│⦿ 〔 _.listbkp_
│⦿ 〔 _.gifhenta_
│⦿ 〔 _.gifblowjob_ 
│⦿ 〔 _.hentaivid_ 
│⦿ 〔 _.hneko_ 
│⦿ 〔 _.nwaifu_ 
│⦿ 〔 _.animespank_ 
│⦿ 〔 _.trap_ 
│⦿ 〔 _.gasm_ 
│⦿ 〔 _.ahegao_ 
│⦿ 〔 _.ass_ 
│⦿ 〔 _.bdsm_
│⦿ 〔 _.blowjob_ 
│⦿ 〔 _.cuckold_ 
│⦿ 〔 _.cum_ 
│⦿ 〔 _.milf_ 
│⦿ 〔 _.eba_ 
│⦿ 〔 _.ero_ 
│⦿ 〔 _.femdom_ 
│⦿ 〔 _.foot_ 
│⦿ 〔 _.gangbang_ 
│⦿ 〔 _.glasses_ 
│⦿ 〔 _.jahy_ 
│⦿ 〔 _.masturbation_
│⦿ 〔 _.mangasearch_ 
│⦿ 〔 _.neko-hentai_ 
│⦿ 〔 _.neko-hentai2_ 
│⦿ 〔 _.nsfwloli_ 
│⦿ 〔 _.orgy_
│⦿ 〔 _.panties_  
│⦿ 〔 _.pussy_ 
│⦿ 〔 _.tentacles_ 
│⦿ 〔 _.thighs_ 
│⦿ 〔 _.yuri_ 
│⦿ 〔 _.zettai_
│⦿ 〔 _.xnxxsearch_
│⦿ 〔 _.xnxxdl_
◣──────────❈
◤─「 \`EPHOTO MAKER\` 」─✦
│⦿ 〔 _.glitchtext_
│⦿ 〔 _.writetext_
│⦿ 〔 _.advancedglow_
│⦿ 〔 _.typographytext_
│⦿ 〔 _.pixelglitch_
│⦿ 〔 _.neonglitch_
│⦿ 〔 _.flagtext_
│⦿ 〔 _.flag3dtext_
│⦿ 〔 _.deletingtext_
│⦿ 〔 _.blackpinkstyle_
│⦿ 〔 _.glowingtext_
│⦿ 〔 _.underwatertext_
│⦿ 〔 _.logomaker_
│⦿ 〔 _.cartoonstyle_
│⦿ 〔 _.papercutstyle_
│⦿ 〔 _.watercolortext_
│⦿ 〔 _.effectclouds_
│⦿ 〔 _.blackpinklogo_
│⦿ 〔 _.gradienttext_
│⦿ 〔 _.summerbeach_
│⦿ 〔 _.luxurygold_
│⦿ 〔 _.multicoloredneon_
│⦿ 〔 _.sandsummer_
│⦿ 〔 _.galaxywallpaper_
│⦿ 〔 _.1917style_
│⦿ 〔 _.makingneon_
│⦿ 〔 _.royaltext_
│⦿ 〔 _.freecreate_
│⦿ 〔 _.galaxystyle_
│⦿ 〔 _.lighteffects_
◣──────────❈
◤─「 \`OTHER MENU\` 」─✦
│⦿ 〔 _.ping_
│⦿ 〔 _.brat_
│⦿ 〔 _.ceksewa_
│⦿ 〔 _.listsewa_
│⦿ 〔 _.readviewonce_
│⦿ 〔 _.cekkhodam_
│⦿ 〔 _.paptt_
│⦿ 〔 _.alkitab_
│⦿ 〔 _.totalfitur_
│⦿ 〔 _.menu_
│⦿ 〔 _.myip_
│⦿ 〔 _.reportbug_
│⦿ 〔 _.listpem_
│⦿ 〔 _.liststicker_
│⦿ 〔 _.listimage_
│⦿ 〔 _.listvideo_
│⦿ 〔 _.listvn_
│⦿ 〔 _.listbadword_
│⦿ 〔 _.listpc_
│⦿ 〔 _.listgc_
│⦿ 〔 _.owner_
│⦿ 〔 _.jadibot_
│⦿ 〔 _.listjadibot_
│⦿ 〔 _.donate_
│⦿ 〔 _.friend_
│⦿ 〔 _.obfuscate_
│⦿ 〔 _.styletext_
│⦿ 〔 _.fliptext_
│⦿ 〔 _.tts_
│⦿ 〔 _.say_
│⦿ 〔 _.togif_
│⦿ 〔 _.toqr_
│⦿ 〔 _.bass_
│⦿ 〔 _.blown_
│⦿ 〔 _.deep_
│⦿ 〔 _.earrape_
│⦿ 〔 _.fast_
│⦿ 〔 _.fat_
│⦿ 〔 _.nightcore_
│⦿ 〔 _.reverse_
│⦿ 〔 _.robot_
│⦿ 〔 _.slow_
│⦿ 〔 _.smooth_
│⦿ 〔 _.squirrel_
│⦿ 〔 _.tinyurl_
│⦿ 〔 _.tinyurl__
│⦿ 〔 _.tovn___
│⦿ 〔 _.toaudio_
│⦿ 〔 _.tomp3__
│⦿ 〔 _.tomp4_
│⦿ 〔 _.toimg_
│⦿ 〔 _.toonce_
│⦿ 〔 _.sticker_
│⦿ 〔 _.take_
│⦿ 〔 _.emoji_
│⦿ 〔 _.volume_
│⦿ 〔 _.ebinary_
│⦿ 〔 _.dbinary_
│⦿ 〔 _.ssweb_
│⦿ 〔 _.quoted_
│⦿ 〔 _.runtime_
◣──────────❈
◤─「 \`PRIMBON MENU\` 」─✦
│⦿ 〔 _.artimimpi_
│⦿ 〔 _.artinama_
│⦿ 〔 _.ramaljodoh_
│⦿ 〔 _.ramaljodohbali_
│⦿ 〔 _.suamiistri_
│⦿ 〔 _.ramalcinta_
│⦿ 〔 _.cocoknama_
│⦿ 〔 _.pasangan_
│⦿ 〔 _.jadiannikah_
│⦿ 〔 _.sifatusaha_
│⦿ 〔 _.rezeki_
│⦿ 〔 _.pekerjaan_
│⦿ 〔 _.nasib_
│⦿ 〔 _.penyakit_
│⦿ 〔 _.tarot_
│⦿ 〔 _.fengshui_
│⦿ 〔 _.haribaik_
│⦿ 〔 _.harisangar_
│⦿ 〔 _.harisial_
│⦿ 〔 _.nagahari_
│⦿ 〔 _.arahrezeki_
│⦿ 〔 _.peruntungan_
│⦿ 〔 _.weton_
│⦿ 〔 _.karakter_
│⦿ 〔 _.keberuntungan_
│⦿ 〔 _.memancing_
│⦿ 〔 _.masasubur_
│⦿ 〔 _.zodiak_
│⦿ 〔 _.shio_
◣──────────❈
◤─「 \`CERTIFIKAT MENU\` 」─✦
│⦿ 〔 _.stkbaik_
│⦿ 〔 _.stkcantik_
│⦿ 〔 _.stkganteng_
│⦿ 〔 _.stkhitam_
│⦿ 〔 _.stkmiskin_
│⦿ 〔 _.stkkaya_
│⦿ 〔 _.stkmarah_
│⦿ 〔 _.stksabar_
│⦿ 〔 _.stksakiti_
│⦿ 〔 _.stkkeren_
│⦿ 〔 _.stkstkmisterius_
│⦿ 〔 _.stksantai_
│⦿ 〔 _.stksombong_
│⦿ 〔 _.stklucu_
│⦿ 〔 _.stkgila_
◣──────────❈`}

global.animemenu = (prefix) => {
	return `◤─「 \`ANIME\` 」─✦
│⦿ 〔 _.akira_
│⦿ 〔 _.akiyama_
│⦿ 〔 _.ana_
│⦿ 〔 _.asuna_
│⦿ 〔 _.ayuzawa_
│⦿ 〔 _.boruto_
│⦿ 〔 _.chiho_
│⦿ 〔 _.chitoge_
│⦿ 〔 _.cosplayloli_
│⦿ 〔 _.cosplaysagiri_
│⦿ 〔 _.deidara_
│⦿ 〔 _.doraemon_
│⦿ 〔 _.elaina_
│⦿ 〔 _.emilia_
│⦿ 〔 _.erza_
│⦿ 〔 _.gremory_
│⦿ 〔 _.hestia_
│⦿ 〔 _.hinata_
│⦿ 〔 _.husbu_
│⦿ 〔 _.inori_
│⦿ 〔 _.isuzu_
│⦿ 〔 _.itachi_
│⦿ 〔 _.itori_
│⦿ 〔 _.kaga_
│⦿ 〔 _.kagura_
│⦿ 〔 _.kakasih_
│⦿ 〔 _.kaori_
│⦿ 〔 _.keneki_
│⦿ 〔 _.kotori_
│⦿ 〔 _.kurumi_
│⦿ 〔 _.loli_
│⦿ 〔 _.madara_
│⦿ 〔 _.megumin_
│⦿ 〔 _.mikasa_
│⦿ 〔 _.mikey_
│⦿ 〔 _.miku_
│⦿ 〔 _.minato_
│⦿ 〔 _.naruto_
│⦿ 〔 _.neko_
│⦿ 〔 _.neko2_
│⦿ 〔 _.nekonime_
│⦿ 〔 _.nezuko_
│⦿ 〔 _.onepiece_
│⦿ 〔 _.pokemon_
│⦿ 〔 _.randomnime_
│⦿ 〔 _.randomnime2_
│⦿ 〔 _.rize_
│⦿ 〔 _.sagiri_
│⦿ 〔 _.sakura_
│⦿ 〔 _.sasuke_
│⦿ 〔 _.shina_
│⦿ 〔 _.shinka_
│⦿ 〔 _.shinomiya_
│⦿ 〔 _.shizuka_
│⦿ 〔 _.shota_
│⦿ 〔 _.tejina_
│⦿ 〔 _.toukachan_
│⦿ 〔 _.tsunade_
│⦿ 〔 _.waifu_
│⦿ 〔 _.animewall_
│⦿ 〔 _.yotsuba_
│⦿ 〔 _.yuki_
│⦿ 〔 _.yulibocil_
│⦿ 〔 _.yumeko_
│⦿ 〔 _.8ball_
│⦿ 〔 _.tickle_
│⦿ 〔 _.gecg_
│⦿ 〔 _.feed_
│⦿ 〔 _.animeawoo_
│⦿ 〔 _.animemegumin_
│⦿ 〔 _.animeshinobu_
│⦿ 〔 _.animehandhold_
│⦿ 〔 _.animehighfive_
│⦿ 〔 _.animecringe_
│⦿ 〔 _.animedance_
│⦿ 〔 _.animehappy_
│⦿ 〔 _.animeglomp_
│⦿ 〔 _.animeblush_
│⦿ 〔 _.animesmug_
│⦿ 〔 _.animewave_
│⦿ 〔 _.animesmile_
│⦿ 〔 _.animepoke_
│⦿ 〔 _.animewink_
│⦿ 〔 _.animebonk_
│⦿ 〔 _.animebully_
│⦿ 〔 _.animeyeet_
│⦿ 〔 _.animebite_
│⦿ 〔 _.animelick_
│⦿ 〔 _.animekill_
│⦿ 〔 _.animecry_
│⦿ 〔 _.animewlp_
│⦿ 〔 _.animekiss_
│⦿ 〔 _.animehug_
│⦿ 〔 _.animeneko_
│⦿ 〔 _.animepat_
│⦿ 〔 _.animeslap_
│⦿ 〔 _.animecuddle_
│⦿ 〔 _.animewaifu_
│⦿ 〔 _.animenom_
│⦿ 〔 _.animefoxgirl_
│⦿ 〔 _.animegecg_
│⦿ 〔 _.animetickle_
│⦿ 〔 _.animefeed_
│⦿ 〔 _.animeavatar_
│⦿ 〔 _.genshin_
│⦿ 〔 _.anime_
│⦿ 〔 _.amv_
◣──────────❈`}

global.ownermenu = (prefix) => {
	return `◤─「 \`OWNER MENU\` 」─✦
│⦿ 〔 _.autoread_
│⦿ 〔 _.upchv2_
│⦿ 〔 _.addsewa_
│⦿ 〔 _.delwa_
│⦿ 〔 _.onlypc_
│⦿ 〔 _.onlygc_
│⦿ 〔 _.self_
│⦿ 〔 _.clearchat_
│⦿ 〔 _.pinchat_
│⦿ 〔 _.unpinchat_
│⦿ 〔 _.gconly_ 
│⦿ 〔 _.public_ 
│⦿ 〔 _.setpppanjang_ 
│⦿ 〔 _.setppgcpanjang_ 
│⦿ 〔 _.addcase_
│⦿ 〔 _.join_ 
│⦿ 〔 _.bctext_ 
│⦿ 〔 _.poll_ 
│⦿ 〔 _.bcimage_
│⦿ 〔 _.bcvideo_
│⦿ 〔 _.creategc_
│⦿ 〔 _.setexif_
│⦿ 〔 _.userjid_
│⦿ 〔 _.setbotname_
│⦿ 〔 _.setbotbio_
│⦿ 〔 _.delppbot_
│⦿ 〔 _.restart_
│⦿ 〔 _.setppbot_
│⦿ 〔 _.addprem_
│⦿ 〔 _.delprem_
│⦿ 〔 _.addowner_
│⦿ 〔 _.delowner_
│⦿ 〔 _.addvn_
│⦿ 〔 _.delvn_
│⦿ 〔 _.addsticker_
│⦿ 〔 _.delsticker_
│⦿ 〔 _.addimage_
│⦿ 〔 _.delimage_
│⦿ 〔 _.addvideo_
│⦿ 〔 _.delvideo_
│⦿ 〔 _.block_
│⦿ 〔 _.unblock del_
│⦿ 〔 _.leavegc_
│⦿ 〔 _.pushkontak_
│⦿ 〔 _.pushkontakv2_
│⦿ 〔 _.pushkontakv3_
│⦿ 〔 _.pushkontakv4_
│⦿ 〔 _.savekontakv_
│⦿ 〔 _.savekontakv2_
│⦿ 〔 _.getkontak_
│⦿ 〔 _.sendkontak_
│⦿ 〔 _.jpm_
│⦿ 〔 _.jpm2_
◣──────────❈`}

global.othermenu = (prefix) => {
	return `◤─「 \`OTHER MENU\` 」─✦
│⦿ 〔 _.ping_
│⦿ 〔 _.brat_
│⦿ 〔 _.ceksewa_
│⦿ 〔 _.listsewa_
│⦿ 〔 _.readviewonce_
│⦿ 〔 _.cekkhodam_
│⦿ 〔 _.paptt_
│⦿ 〔 _.alkitab_
│⦿ 〔 _.totalfitur_
│⦿ 〔 _.menu_
│⦿ 〔 _.myip_
│⦿ 〔 _.reportbug_
│⦿ 〔 _.listpem_
│⦿ 〔 _.liststicker_
│⦿ 〔 _.listimage_
│⦿ 〔 _.listvideo_
│⦿ 〔 _.listvn_
│⦿ 〔 _.listbadword_
│⦿ 〔 _.listpc_
│⦿ 〔 _.listgc_
│⦿ 〔 _.owner_
│⦿ 〔 _.jadibot_
│⦿ 〔 _.listjadibot_
│⦿ 〔 _.donate_
│⦿ 〔 _.friend_
│⦿ 〔 _.obfuscate_
│⦿ 〔 _.styletext_
│⦿ 〔 _.fliptext_
│⦿ 〔 _.tts_
│⦿ 〔 _.say_
│⦿ 〔 _.togif_
│⦿ 〔 _.toqr_
│⦿ 〔 _.bass_
│⦿ 〔 _.blown_
│⦿ 〔 _.deep_
│⦿ 〔 _.earrape_
│⦿ 〔 _.fast_
│⦿ 〔 _.fat_
│⦿ 〔 _.nightcore_
│⦿ 〔 _.reverse_
│⦿ 〔 _.robot_
│⦿ 〔 _.slow_
│⦿ 〔 _.smooth_
│⦿ 〔 _.squirrel_
│⦿ 〔 _.tinyurl_
│⦿ 〔 _.tinyurl__
│⦿ 〔 _.tovn___
│⦿ 〔 _.toaudio_
│⦿ 〔 _.tomp3__
│⦿ 〔 _.tomp4_
│⦿ 〔 _.toimg_
│⦿ 〔 _.toonce_
│⦿ 〔 _.sticker_
│⦿ 〔 _.take_
│⦿ 〔 _.emoji_
│⦿ 〔 _.volume_
│⦿ 〔 _.ebinary_
│⦿ 〔 _.dbinary_
│⦿ 〔 _.ssweb_
│⦿ 〔 _.quoted_
│⦿ 〔 _.runtime_
◣──────────❈`}

global.rpgmenu = (prefix, hituet) => {
	return `◤─「 \`RPG MENU\` 」─✦
│⦿ 〔 _.kerja_
│⦿ 〔 _.fightnaga_
│⦿ 〔 _.fightkucing_
│⦿ 〔 _.fightphonix_
│⦿ 〔 _.fightgriffin_
│⦿ 〔 _.fightkyubi_
│⦿ 〔 _.fightcentaur_
│⦿ 〔 _.nabung_
│⦿ 〔 _.mining_
│⦿ 〔 _.bankcek_
│⦿ 〔 _.maling_
│⦿ 〔 _.banknabung_
│⦿ 〔 _.banktarik_
│⦿ 〔 _.berkebon_
│⦿ 〔 _.crafting_
│⦿ 〔 _.bet_
│⦿ 〔 _.bonus_
│⦿ 〔 _.buah_
│⦿ 〔 _.nebang_
│⦿ 〔 _.bekerja_
│⦿ 〔 _.bansos_
│⦿ 〔 _.taxy_
│⦿ 〔 _.mulung_
│⦿ 〔 _.berburu_
│⦿ 〔 _.polisi_
│⦿ 〔 _.berdagang_
│⦿ 〔 _.rampok_
│⦿ 〔 _.bunuh_
│⦿ 〔 _.collect_
│⦿ 〔 _.mancing_
│⦿ 〔 _.repair_
│⦿ 〔 _.feed_
│⦿ 〔 _.fight_
│⦿ 〔 _.gajian_
│⦿ 〔 _.upgrade_
│⦿ 〔 _.transfer_
│⦿ 〔 _.shop_
│⦿ 〔 _.selectskill_
│⦿ 〔 _.sampah_
│⦿ 〔 _.roket_
│⦿ 〔 _.ojek_
│⦿ 〔 _.nguli_
│⦿ 〔 _.pasar_
│⦿ 〔 _.rob_
│⦿ 〔 _.referal_
│⦿ 〔 _.petshop_
│⦿ 〔 _.kolam_
│⦿ 〔 _.koboy_
│⦿ 〔 _.leaderboard_
│⦿ 〔 _.casino_
◣──────────❈`}

global.gamemenu = (prefix, hituet) => {
	return `◤─「 \`GAME MENU\` 」─✦
│⦿ 〔 _.tebakkata_
│⦿ 〔 _.tebaktebakan_
│⦿ 〔 _.tebaklirik_
│⦿ 〔 _.tebakgambar_
│⦿ 〔 _.tebaklagu_
│⦿ 〔 _.tebakkimia_
│⦿ 〔 _.asahotak_
│⦿ 〔 _.siapaaku_
│⦿ 〔 _.susunkata_
│⦿ 〔 _.tekateki_
│⦿ 〔 _.tebakbendera_
│⦿ 〔 _.tebakbenderav2_
│⦿ 〔 _.tebakkabupaten_
│⦿ 〔 _.caklontong_
│⦿ 〔 _.family100_
│⦿ 〔 _.werewolf_
◣──────────❈`}

global.newupdate = (prefix) => {
	return `◤─「 \`NEW UPDATE\` 」─✦
│⦿ 〔 _.nglspam_
│⦿ 〔 _.bratvideo_
│⦿ 〔 _.chord_
│⦿ 〔 _.nulishitam_
│⦿ 〔 _.readmore_
│⦿ 〔 _.mcmap_
│⦿ 〔 _.aigen_
│⦿ 〔 _.romchat_
│⦿ 〔 _.animebrat_
│⦿ 〔 _.animebrat-vid_
│⦿ 〔 _.totalchat_
│⦿ 〔 _.hytamkan_ 
│⦿ 〔 _.totalfitur_
│⦿ 〔 _.superhd_
│⦿ 〔 _.youtubestalk_
│⦿ 〔 _.carimusic_
│⦿ 〔 _.antitagsw_
│⦿ 〔 _.enchard_
│⦿ 〔 _.buatlogo_
│⦿ 〔 _.chat_
│⦿ 〔 _.upch_
◣──────────❈  `}

global.downloadmenu = (prefix) => {
	return `◤─「 \`DOWNLOAD MENU\` 」─✦
│⦿ 〔 _.tiktok_
│⦿ 〔 _.tiktokslide_
│⦿ 〔 _.videy_
│⦿ 〔 _.tiktokaudio_
│⦿ 〔 _.filmsearch_
│⦿ 〔 _.ytsearch <mp3>_
│⦿ 〔 _.ytsearch2 <mp4>_
│⦿ 〔 _.ttsearch_
│⦿ 〔 _.teraboxdl_
│⦿ 〔 _.snackvideo_
│⦿ 〔 _.capcutdl_
│⦿ 〔 _.play_
│⦿ 〔 _.playyt_
│⦿ 〔 _.ytplay (link youtubenya)_
│⦿ 〔 _.playspotify_
│⦿ 〔 _.ytmp3_
│⦿ 〔 _.ytmp4_
│⦿ 〔 _.google_
│⦿ 〔 _.imdb_
│⦿ 〔 _.weather_
│⦿ 〔 _.cuaca_
│⦿ 〔 _.wanumber_
│⦿ 〔 _.instagram_
│⦿ 〔 _.facebook_
│⦿ 〔 _.twittervid_
│⦿ 〔 _.spotify_
│⦿ 〔 _.gitclone_
│⦿ 〔 _.happymod_
│⦿ 〔 _.gdrive_
│⦿ 〔 _.pinterest_
│⦿ 〔 _.ringtone_
◣──────────❈`}

global.groupmenu = (prefix) => {
	return `◤─「 \`GROUP MENU\` 」─✦
│⦿ 〔 _.sider_
│⦿ 〔 _.autoaigc_
│⦿ 〔 _.warcall_
│⦿ 〔 _.autosimi_
│⦿ 〔 _.yoimiyachat_
│⦿ 〔 _.mute_
│⦿ 〔 _.welcome on/off_
│⦿ 〔 _.antilink_
│⦿ 〔 _.antiwame_
│⦿ 〔 _.linkgc_
│⦿ 〔 _.invite_
│⦿ 〔 _.ephemeral_
│⦿ 〔 _.delete_
│⦿ 〔 _.setppgroup_
│⦿ 〔 _.delppgroup_
│⦿ 〔 _.setname_
│⦿ 〔 _.setdesc_
│⦿ 〔 _.add_
│⦿ 〔 _.kick_
│⦿ 〔 _.promote_
│⦿ 〔 _.demote_
│⦿ 〔 _.hidetag_
│⦿ 〔 _.totag_
│⦿ 〔 _.tagall_
│⦿ 〔 _.editinfo_
│⦿ 〔 _.opentime_
│⦿ 〔 _.closetime_
│⦿ 〔 _.resetlink_
│⦿ 〔 _.getbio_
│⦿ 〔 _.vote_
│⦿ 〔 _.upvote_
│⦿ 〔 _.downvote_
│⦿ 〔 _.checkvote_
│⦿ 〔 _.delvote_
│⦿ 〔 _.autostickergc_
│⦿ 〔 _.antilinkgc_
│⦿ 〔 _.antiwame_
│⦿ 〔 _.antilinkall_
│⦿ 〔 _.antilinktiktok_
│⦿ 〔 _.antilinkfb_
│⦿ 〔 _.antilinktwitter_
│⦿ 〔 _.antilinkig_
│⦿ 〔 _.antilinktg_
│⦿ 〔 _.antilinkytvid_
│⦿ 〔 _.antilinkytch_
│⦿ 〔 _.antivirus_
│⦿ 〔 _.antitoxic_
│⦿ 〔 _.nsfw_
│⦿ 〔 _.react_
◣──────────❈`}

global.funmenu = (prefix) => {
	return `◤─「 \`FUN MENU\` 」─✦
│⦿ 〔 _.smeme_
│⦿ 〔 _.ppcouple_
│⦿ 〔 _.define_
│⦿ 〔 _.qc_
│⦿ 〔 _.qcwarna_
│⦿ 〔 _.kodeqc_
│⦿ 〔 _.lyrics_
│⦿ 〔 _.suit_
│⦿ 〔 _.math_
│⦿ 〔 _.tictactoe_
│⦿ 〔 _.fact_
│⦿ 〔 _.truth_
│⦿ 〔 _.dare_
│⦿ 〔 _.couple_
│⦿ 〔 _.soulmate_
│⦿ 〔 _.stupidcheck_
│⦿ 〔 _.handsomecheck_
│⦿ 〔 _.uncleancheck_
│⦿ 〔 _.hotcheck_
│⦿ 〔 _.smartcheck_
│⦿ 〔 _.greatcheck_
│⦿ 〔 _.evilcheck_
│⦿ 〔 _.dogcheck_
│⦿ 〔 _.coolcheck_
│⦿ 〔 _.waifucheck_
│⦿ 〔 _.awesomecheck_
│⦿ 〔 _.gaycheck_
│⦿ 〔 _.cutecheck_
│⦿ 〔 _.lesbiancheck_
│⦿ 〔 _.hornycheck_
│⦿ 〔 _.prettycheck_
│⦿ 〔 _.lovelycheck_
│⦿ 〔 _.uglycheck_
│⦿ 〔 _.pick_
│⦿ 〔 _.quotes_
│⦿ 〔 _.can_
│⦿ 〔 _.is_
│⦿ 〔 _.when_
│⦿ 〔 _.where_
│⦿ 〔 _.what_
│⦿ 〔 _.how_
│⦿ 〔 _.rate_
│⦿ 〔 _.cry_
│⦿ 〔 _.kill_
│⦿ 〔 _.hug_
│⦿ 〔 _.pat_
│⦿ 〔 _.lick_
│⦿ 〔 _.kiss_
│⦿ 〔 _.bite_
│⦿ 〔 _.yeet_
│⦿ 〔 _.bully_
│⦿ 〔 _.bonk_
│⦿ 〔 _.wink_
│⦿ 〔 _.poke_
│⦿ 〔 _.nom_
│⦿ 〔 _.slap_
│⦿ 〔 _.smile_
│⦿ 〔 _.wave_
│⦿ 〔 _.awoo_
│⦿ 〔 _.blush_
│⦿ 〔 _.smug_
│⦿ 〔 _.glomp_
│⦿ 〔 _.happy_
│⦿ 〔 _.dance_
│⦿ 〔 _.cringe_
│⦿ 〔 _.cuddle_
│⦿ 〔 _.highfive_
│⦿ 〔 _.shinobu_
│⦿ 〔 _.handhold_
│⦿ 〔 _.tickle_
│⦿ 〔 _.avatar_
│⦿ 〔 _.feed_
│⦿ 〔 _.foxgirl_
│⦿ 〔 _.gecg_
│⦿ 〔 _.checkme_
│⦿ 〔 _.sound1 - sound161_
◣──────────❈`}

global.stalkermenu = (prefix) => {
	return `◤─「 \`STALK MENU\` 」─✦
│⦿ 〔 _.igstalk_
│⦿ 〔 _.ttstalk_
│⦿ 〔 _.ffstalk_
│⦿ 〔 _.mlstalk_
│⦿ 〔 _.npmstalk_
│⦿ 〔 _.ghstalk_
◣──────────❈`}

global.stickermenu = (prefix) => {
	return `◤─「 \`STICKER\` 」─✦
│⦿ 〔 _.goose_
│⦿ 〔 _.woof_
│⦿ 〔 _.8ball_
│⦿ 〔 _.lizard_
│⦿ 〔 _.meow_
│⦿ 〔 _.gura_
│⦿ 〔 _.doge_
│⦿ 〔 _.patrick_
│⦿ 〔 _.lovestick_
◣──────────❈`}

global.aimenu = (prefix) => {
	return `◤─「 \`OPEN AI\` 」─✦
│⦿ 〔 _.leptonai_
│⦿ 〔 _.openai_
│⦿ 〔 _.ai_
│⦿ 〔 _.hutaoai_
│⦿ 〔 _.bard_
│⦿ 〔 _.prodia_
│⦿ 〔 _.diffusion-anime_
│⦿ 〔 _.travel-assistant_
│⦿ 〔 _.ocr_
│⦿ 〔 _.guru-ai_
│⦿ 〔 _.emi-ai_
│⦿ 〔 _.claude-ai_
│⦿ 〔 _.costume-ai_
│⦿ 〔 _.herc-ai_
│⦿ 〔 _.hercai-cartoon_
│⦿ 〔 _.hercai-animefy_
│⦿ 〔 _.hercai-lexica_
│⦿ 〔 _.hercai-prodia_
│⦿ 〔 _.hercai-simurg_
│⦿ 〔 _.hercai-raava_
│⦿ 〔 _.hercai-shonin_
│⦿ 〔 _.realistic_
│⦿ 〔 _.3dmodel_
│⦿ 〔 _.jadizombie_
│⦿ 〔 _.blackboxai_
│⦿ 〔 _.photoleapai_
│⦿ 〔 _.diffusion_
│⦿ 〔 _.indo-ai_
│⦿ 〔 _.lamaai_
│⦿ 〔 _.aivo_
│⦿ 〔 _.gemini_
│⦿ 〔 _.text2img_
│⦿ 〔 _.absolutely_
│⦿ 〔 _.dalle_
│⦿ 〔 _.bingimg_
│⦿ 〔 _.bingai_
│⦿ 〔 _.gptimg_
│⦿ 〔 _.gpt4_
│⦿ 〔 _.gpt4_2_
│⦿ 〔 _.anything_
│⦿ 〔 _.hdvid_
│⦿ 〔 _.cai_
│⦿ 〔 _.youai_
│⦿ 〔 _.remini_
│⦿ 〔 _.jadianime_
│⦿ 〔 _.removebg_
│⦿ 〔 _.nulis_
◣──────────❈`}

global.quotesmenu = (prefix) => {
	return `◤─「 \`QUOTES MENU\` 」─✦
│⦿ 〔 _.quotesanime_ 
│⦿ 〔 _.quotesbacot_ 
│⦿ 〔 _.quotesbucin_ 
│⦿ 〔 _.quotesmotivasi_ 
│⦿ 〔 _.quotesgalau_ 
│⦿ 〔 _.quotesgombal_ 
│⦿ 〔 _.quoteshacker_ 
│⦿ 〔 _.quotesbijak_ 
◣──────────❈`}

global.storemenu = (prefix) => {
	return `◤─「 \`STORE MENU\` 」─✦ 
│⦿ 〔 _.list_
│⦿ 〔 _.addlist_
│⦿ 〔 _.dellist_
│⦿ 〔 _.update_
│⦿ 〔 _.jeda_
│⦿ 〔 _.tambah_
│⦿ 〔 _.kurang_
│⦿ 〔 _.kali_
│⦿ 〔 _.bagi_
│⦿ 〔 _.delsetdone_
│⦿ 〔 _.changedone_
│⦿ 〔 _.setdone_
│⦿ 〔 _.delproses_
│⦿ 〔 _.changeproses_
│⦿ 〔 _.setproses_
│⦿ 〔 _.proses <reply chat>_
│⦿ 〔 _.done <reply chat>_
◣──────────❈`}

global.cpanelmenu = (prefix) => {
	return `◤─「 \`CPANEL MENU\` 」─✦
│⦿ 〔 _.listusr_
│⦿ 〔 _.delusr_
│⦿ 〔 _.listsrv_
│⦿ 〔 _.delsrv_
│⦿ 〔 _.tutorial_
│⦿ 〔 _.ramlist_
│⦿ 〔 _.premlist_
│⦿ 〔 _.updatesrv_
│⦿ 〔 _.suspend_
│⦿ 〔 _.unsuspend_
│⦿ 〔 _.createadmin_
│⦿ 〔 _.listadmin_
◣──────────❈`}

global.anonymousmenu = (prefix) => {
	return `◤─「 \`ANONYMOUS\` 」─✦
│⦿ 〔 _.anonymouschat_
│⦿ 〔 _.start_
│⦿ 〔 _.next_
│⦿ 〔 _.stop_
│⦿ 〔 _.sendprofile_
│⦿ 〔 _.menfess_
│⦿ 〔 _.confess_
│⦿ 〔 _.balasmenfess_
│⦿ 〔 _.tolakmenfess_
│⦿ 〔 _.stopmenfess_
◣──────────❈`}

global.randomphotomenu = (prefix) => {
	return `◤─「 \`RANDOM PHOTO\` 」─✦
│⦿ 〔 _.aesthetic_
│⦿ 〔 _.coffee_
│⦿ 〔 _.wikimedia_
│⦿ 〔 _.wallpaper_
│⦿ 〔 _.art_
│⦿ 〔 _.bts_
│⦿ 〔 _.dogwoof_
│⦿ 〔 _.catmeow_
│⦿ 〔 _.lizardpic_
│⦿ 〔 _.goosebird_
│⦿ 〔 _.8ballpool_
│⦿ 〔 _.cosplay_
│⦿ 〔 _.hacker_
│⦿ 〔 _.cyber_
│⦿ 〔 _.gamewallpaper_
│⦿ 〔 _.islamic_
│⦿ 〔 _.jennie_
│⦿ 〔 _.jiso_
│⦿ 〔 _.satanic_
│⦿ 〔 _.justina_
│⦿ 〔 _.cartoon_
│⦿ 〔 _.pentol_
│⦿ 〔 _.cat_
│⦿ 〔 _.kpop_
│⦿ 〔 _.exo_
│⦿ 〔 _.lisa_
│⦿ 〔 _.space_
│⦿ 〔 _.car_
│⦿ 〔 _.technology_
│⦿ 〔 _.bike_
│⦿ 〔 _.shortquote_
│⦿ 〔 _.antiwork_
│⦿ 〔 _.hacking_
│⦿ 〔 _.boneka_
│⦿ 〔 _.rose_
│⦿ 〔 _.ryujin_
│⦿ 〔 _.ulzzangboy_
│⦿ 〔 _.ulzzanggirl_
│⦿ 〔 _.wallml_
│⦿ 〔 _.wallphone_
│⦿ 〔 _.mountain_
│⦿ 〔 _.goose_
│⦿ 〔 _.profilepic_
│⦿ 〔 _.couplepic_
│⦿ 〔 _.programming_
│⦿ 〔 _.pubg_
│⦿ 〔 _.blackpink_
│⦿ 〔 _.randomboy_
│⦿ 〔 _.randomgirl_
│⦿ 〔 _.hijab_
│⦿ 〔 _.chinese_
│⦿ 〔 _.indo_
│⦿ 〔 _.japanese_
│⦿ 〔 _.korean_
│⦿ 〔 _.malay_
│⦿ 〔 _.thai_
│⦿ 〔 _.vietnamese_
◣──────────❈
◤─「 \`STICKER\` 」─✦
│⦿ 〔 _.goose_
│⦿ 〔 _.woof_
│⦿ 〔 _.8ball_
│⦿ 〔 _.lizard_
│⦿ 〔 _.meow_
│⦿ 〔 _.gura_
│⦿ 〔 _.doge_
│⦿ 〔 _.patrick_
│⦿ 〔 _.lovestick_
◣──────────❈
◤─「 \`ANIME\` 」─✦
│⦿ 〔 _.akira_
│⦿ 〔 _.akiyama_
│⦿ 〔 _.ana_
│⦿ 〔 _.asuna_
│⦿ 〔 _.ayuzawa_
│⦿ 〔 _.boruto_
│⦿ 〔 _.chiho_
│⦿ 〔 _.chitoge_
│⦿ 〔 _.cosplayloli_
│⦿ 〔 _.cosplaysagiri_
│⦿ 〔 _.deidara_
│⦿ 〔 _.doraemon_
│⦿ 〔 _.elaina_
│⦿ 〔 _.emilia_
│⦿ 〔 _.erza_
│⦿ 〔 _.gremory_
│⦿ 〔 _.hestia_
│⦿ 〔 _.hinata_
│⦿ 〔 _.husbu_
│⦿ 〔 _.inori_
│⦿ 〔 _.isuzu_
│⦿ 〔 _.itachi_
│⦿ 〔 _.itori_
│⦿ 〔 _.kaga_
│⦿ 〔 _.kagura_
│⦿ 〔 _.kakasih_
│⦿ 〔 _.kaori_
│⦿ 〔 _.keneki_
│⦿ 〔 _.kotori_
│⦿ 〔 _.kurumi_
│⦿ 〔 _.loli_
│⦿ 〔 _.madara_
│⦿ 〔 _.megumin_
│⦿ 〔 _.mikasa_
│⦿ 〔 _.mikey_
│⦿ 〔 _.miku_
│⦿ 〔 _.minato_
│⦿ 〔 _.naruto_
│⦿ 〔 _.neko_
│⦿ 〔 _.neko2_
│⦿ 〔 _.nekonime_
│⦿ 〔 _.nezuko_
│⦿ 〔 _.onepiece_
│⦿ 〔 _.pokemon_
│⦿ 〔 _.randomnime_
│⦿ 〔 _.randomnime2_
│⦿ 〔 _.rize_
│⦿ 〔 _.sagiri_
│⦿ 〔 _.sakura_
│⦿ 〔 _.sasuke_
│⦿ 〔 _.shina_
│⦿ 〔 _.shinka_
│⦿ 〔 _.shinomiya_
│⦿ 〔 _.shizuka_
│⦿ 〔 _.shota_
│⦿ 〔 _.tejina_
│⦿ 〔 _.toukachan_
│⦿ 〔 _.tsunade_
│⦿ 〔 _.waifu_
│⦿ 〔 _.animewall_
│⦿ 〔 _.yotsuba_
│⦿ 〔 _.yuki_
│⦿ 〔 _.yulibocil_
│⦿ 〔 _.yumeko_
│⦿ 〔 _.8ball_
│⦿ 〔 _.tickle_
│⦿ 〔 _.gecg_
│⦿ 〔 _.feed_
│⦿ 〔 _.animeawoo_
│⦿ 〔 _.animemegumin_
│⦿ 〔 _.animeshinobu_
│⦿ 〔 _.animehandhold_
│⦿ 〔 _.animehighfive_
│⦿ 〔 _.animecringe_
│⦿ 〔 _.animedance_
│⦿ 〔 _.animehappy_
│⦿ 〔 _.animeglomp_
│⦿ 〔 _.animeblush_
│⦿ 〔 _.animesmug_
│⦿ 〔 _.animewave_
│⦿ 〔 _.animesmile_
│⦿ 〔 _.animepoke_
│⦿ 〔 _.animewink_
│⦿ 〔 _.animebonk_
│⦿ 〔 _.animebully_
│⦿ 〔 _.animeyeet_
│⦿ 〔 _.animebite_
│⦿ 〔 _.animelick_
│⦿ 〔 _.animekill_
│⦿ 〔 _.animecry_
│⦿ 〔 _.animewlp_
│⦿ 〔 _.animekiss_
│⦿ 〔 _.animehug_
│⦿ 〔 _.animeneko_
│⦿ 〔 _.animepat_
│⦿ 〔 _.animeslap_
│⦿ 〔 _.animecuddle_
│⦿ 〔 _.animewaifu_
│⦿ 〔 _.animenom_
│⦿ 〔 _.animefoxgirl_
│⦿ 〔 _.animegecg_
│⦿ 〔 _.animetickle_
│⦿ 〔 _.animefeed_
│⦿ 〔 _.animeavatar_
│⦿ 〔 _.genshin_
│⦿ 〔 _.anime_
│⦿ 〔 _.amv_
◣──────────❈`}

global.randomvideomenu = (prefix) => {
	return `◤─「 \`RANDOM VIDEO\` 」─✦
│⦿ 〔 _.tiktokgirl_
│⦿ 〔 _.tiktoknukthy_
│⦿ 〔 _.tiktokkayes_
│⦿ 〔 _.tiktokpanrika_
│⦿ 〔 _.tiktoknotnot_
│⦿ 〔 _.tiktokghea_
│⦿ 〔 _.tiktoksantuy_
│⦿ 〔 _.tiktokbocil_
◣──────────❈`}

global.primbonmenu = (prefix) => {
	return `◤─「 \`PRIMBON MENU\` 」─✦
│⦿ 〔 _.artimimpi_
│⦿ 〔 _.artinama_
│⦿ 〔 _.ramaljodoh_
│⦿ 〔 _.ramaljodohbali_
│⦿ 〔 _.suamiistri_
│⦿ 〔 _.ramalcinta_
│⦿ 〔 _.cocoknama_
│⦿ 〔 _.pasangan_
│⦿ 〔 _.jadiannikah_
│⦿ 〔 _.sifatusaha_
│⦿ 〔 _.rezeki_
│⦿ 〔 _.pekerjaan_
│⦿ 〔 _.nasib_
│⦿ 〔 _.penyakit_
│⦿ 〔 _.tarot_
│⦿ 〔 _.fengshui_
│⦿ 〔 _.haribaik_
│⦿ 〔 _.harisangar_
│⦿ 〔 _.harisial_
│⦿ 〔 _.nagahari_
│⦿ 〔 _.arahrezeki_
│⦿ 〔 _.peruntungan_
│⦿ 〔 _.weton_
│⦿ 〔 _.karakter_
│⦿ 〔 _.keberuntungan_
│⦿ 〔 _.memancing_
│⦿ 〔 _.masasubur_
│⦿ 〔 _.zodiak_
│⦿ 〔 _.shio_
◣──────────❈`}

global.beritamenu = (prefix) => {
	return `┏『 *\`乂 ʙ ᴇ ʀ ɪ ᴛ ᴀ - ᴍ ᴇ ɴ ᴜ 乂\`* 』━◧
║◦ *${prefix}ғᴀᴊᴀʀ*
║◦ *${prefix}ᴄɴɴ*
║◦ *${prefix}ʟᴀʏᴀʀᴋᴀᴄᴀ*
║◦ *${prefix}ᴄɴʙᴄ*
║◦ *${prefix}ᴛʀɪʙᴜɴ*
║◦ *${prefix}ɪɴᴅᴏᴢᴏɴᴇ*
║◦ *${prefix}ᴋᴏᴍᴘᴀs*
║◦ *${prefix}ᴅᴇᴛɪᴋɴᴇᴡs*
║◦ *${prefix}ᴅᴀɪʟʏɴᴇᴡs*
║◦ *${prefix}ɪɴᴇᴡs*
║◦ *${prefix}ᴏᴋᴇᴢᴏɴᴇ*
║◦ *${prefix}sɪɴᴅᴏ*
║◦ *${prefix}ᴛᴇᴍᴘᴏ*
║◦ *${prefix}ᴀɴᴛᴀʀᴀ*
║◦ *${prefix}ᴋᴏɴᴛᴀɴ*
║◦ *${prefix}ᴍᴇʀᴅᴇᴋᴀ*
║◦ *${prefix}ᴊᴀʟᴀɴᴛɪᴋᴜs*
┗━━━━━━━━━━━━━━━━⊱`}

global.islamimenu = (prefix) => {
	return `◤─「 \`ISLAM MENU\` 」─✦
│⦿ 〔 _.kisahnabi_
│⦿ 〔 _.asmaulhusna_
│⦿ 〔 _.bacaansholat_
│⦿ 〔 _.audiosurah_
│⦿ 〔 _.ayatkursi_
│⦿ 〔 _.doaharian_
│⦿ 〔 _.niatsholat_
│⦿ 〔 _.quotes_
│⦿ 〔 _.sholat_
│⦿ 〔 _.doatahlil_
│⦿ 〔 _.tafsir_
│⦿ 〔 _.jadwalsholat_
◣──────────❈`}

global.ephoto360menu = (prefix) => {
	return `◤─「 \`EPHOTO MAKER\` 」─✦
│⦿ 〔 _.glitchtext_
│⦿ 〔 _.writetext_
│⦿ 〔 _.advancedglow_
│⦿ 〔 _.typographytext_
│⦿ 〔 _.pixelglitch_
│⦿ 〔 _.neonglitch_
│⦿ 〔 _.flagtext_
│⦿ 〔 _.flag3dtext_
│⦿ 〔 _.deletingtext_
│⦿ 〔 _.blackpinkstyle_
│⦿ 〔 _.glowingtext_
│⦿ 〔 _.underwatertext_
│⦿ 〔 _.logomaker_
│⦿ 〔 _.cartoonstyle_
│⦿ 〔 _.papercutstyle_
│⦿ 〔 _.watercolortext_
│⦿ 〔 _.effectclouds_
│⦿ 〔 _.blackpinklogo_
│⦿ 〔 _.gradienttext_
│⦿ 〔 _.summerbeach_
│⦿ 〔 _.luxurygold_
│⦿ 〔 _.multicoloredneon_
│⦿ 〔 _.sandsummer_
│⦿ 〔 _.galaxywallpaper_
│⦿ 〔 _.1917style_
│⦿ 〔 _.makingneon_
│⦿ 〔 _.royaltext_
│⦿ 〔 _.freecreate_
│⦿ 〔 _.galaxystyle_
│⦿ 〔 _.lighteffects_
◣──────────❈`}

global.nsfwmenu = (prefix) => {
	return `◤─「 \`NSFW MENU\` 」─✦
│⦿ 〔 _.hentai_
│⦿ 〔 _.listbkp_
│⦿ 〔 _.gifhenta_
│⦿ 〔 _.gifblowjob_ 
│⦿ 〔 _.hentaivid_ 
│⦿ 〔 _.hneko_ 
│⦿ 〔 _.nwaifu_ 
│⦿ 〔 _.animespank_ 
│⦿ 〔 _.trap_ 
│⦿ 〔 _.gasm_ 
│⦿ 〔 _.ahegao_ 
│⦿ 〔 _.ass_ 
│⦿ 〔 _.bdsm_
│⦿ 〔 _.blowjob_ 
│⦿ 〔 _.cuckold_ 
│⦿ 〔 _.cum_ 
│⦿ 〔 _.milf_ 
│⦿ 〔 _.eba_ 
│⦿ 〔 _.ero_ 
│⦿ 〔 _.femdom_ 
│⦿ 〔 _.foot_ 
│⦿ 〔 _.gangbang_ 
│⦿ 〔 _.glasses_ 
│⦿ 〔 _.jahy_ 
│⦿ 〔 _.masturbation_
│⦿ 〔 _.mangasearch_ 
│⦿ 〔 _.neko-hentai_ 
│⦿ 〔 _.neko-hentai2_ 
│⦿ 〔 _.nsfwloli_ 
│⦿ 〔 _.orgy_
│⦿ 〔 _.panties_  
│⦿ 〔 _.pussy_ 
│⦿ 〔 _.tentacles_ 
│⦿ 〔 _.thighs_ 
│⦿ 〔 _.yuri_ 
│⦿ 〔 _.zettai_
│⦿ 〔 _.xnxxsearch_
│⦿ 〔 _.xnxxdl_
◣──────────❈`}

global.sertifikatmenu = (prefix) => {
	return `◤─「 \`CERTIFIKAT MENU\` 」─✦
│⦿ 〔 _.stkbaik_
│⦿ 〔 _.stkcantik_
│⦿ 〔 _.stkganteng_
│⦿ 〔 _.stkhitam_
│⦿ 〔 _.stkmiskin_
│⦿ 〔 _.stkkaya_
│⦿ 〔 _.stkmarah_
│⦿ 〔 _.stksabar_
│⦿ 〔 _.stksakiti_
│⦿ 〔 _.stkkeren_
│⦿ 〔 _.stkstkmisterius_
│⦿ 〔 _.stksantai_
│⦿ 〔 _.stksombong_
│⦿ 〔 _.stklucu_
│⦿ 〔 _.stkgila_
◣──────────❈`}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
