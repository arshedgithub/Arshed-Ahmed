# Arabic copy: native-speaker review

The Arabic on this site was written by an AI model, and Arshed's own Arabic is basic, so nobody has yet read it as a
native speaker would. The audience is Gulf (UAE) recruiters. The target is natural, confident Modern Standard Arabic:
short sentences, professional but not stiff.

**What to check:** does it sound like something a Gulf-based engineer would write? Flag anything stiff, literal or
wrong, and anything that overstates or changes a claim. Keep tech and product names in Latin script
(Next.js, Stripe, SLMarket, Softsora, Solitrium Academy).

**How to change a string:** edit the value in `messages/ar.json` under the listed key. Case studies are in
`src/content/projects/ar/`. This file is a snapshot, so `ar.json` wins if the two differ.

## Questions for the reviewer

These are the choices I am least sure of.

1. **"Full-Stack" in Latin script.** "مهندس برمجيات Full-Stack" follows the brief. Does it read naturally to a Gulf recruiter?
2. **Proration: "الاحتساب التناسبي".** This is my rendering of Stripe "proration". Is there a more established finance or SaaS term?
3. **"Solo" claims: "بمفردي".** Used throughout ("صممت وبنيت وأطلقت ... بمفردي"). Is it confident, or does it read as lonely or informal? Would "بشكل مستقل" be better? Note that "مستقل" could also suggest freelance.
4. **"Chatbot": "روبوت دردشة", against "بوت" in the WhatsApp project title.** Both appear. Should one be used everywhere?
5. **"Available immediately": "متاح للانضمام فوراً".** This was supplied in the brief. Notice period is the single word "فوراً"; check that it reads correctly after the label "فترة الإشعار:".
6. **Backend: "الواجهة الخلفية".** Literal, but common. Would Gulf engineers rather see "Backend" in Latin script?
7. **Job titles.** "مهندس برمجيات مساعد" (Associate), "متدرب هندسة برمجيات" (Intern) and "محاضر مساعد ومشرف مختبرات" (Junior Lecturer / Demonstrator) should be checked against how Gulf HR titles these roles.
8. **University names.** "كلية الحاسوب بجامعة كولومبو (UCSC)" is my rendering, not an official Arabic name. Keep the English name if there is doubt.
9. **Nationality: "سريلانكي الجنسية".** Does this suit a chip on a CV-style page, or is "سريلانكي" enough?
10. **The reply-speed note** (`contact.replyNote`). It should be honest without undermining the page. Check the tone.
11. **Search wording.** The home title lists "في دبي وأبوظبي وعجمان", and the description says "مهندس ومطور برمجيات". Are these the words a Gulf recruiter would type into Google? Suggest better ones if not.
12. **Share images.** `public/images/og/ar/` has the Arabic cards shown on WhatsApp and LinkedIn. Check that the text reads well. Text changes need `npm run og:ar`.

## High risk: career claims and voice

Mistakes here change what Arshed is claiming about their own work, or make the first impression sound machine-written. Review every line.

| Key | English | Arabic |
| --- | --- | --- |
| `meta.description` | Full-stack software engineer in the UAE, available now for roles in Dubai, Abu Dhabi and Ajman. I build SaaS, Stripe payments and AI products with Next.js. | مهندس ومطور برمجيات Full-Stack في الإمارات، متاح للعمل فوراً في دبي وأبوظبي وعجمان. أبني تطبيقات ويب ومنتجات SaaS وأنظمة دفع باستخدام Next.js وNode.js. |
| `common.positioning` | Full-stack engineer building SaaS, payments and AI products with Next.js, TypeScript and Node.js. | أبني منتجات SaaS وأنظمة دفع وحلول ذكاء اصطناعي باستخدام Next.js وTypeScript وNode.js. |
| `experience.items.slmarket.role` | Full-Stack Developer | مطور Full-Stack |
| `experience.items.slmarket.bullets.0` | Designed, built and launched two products solo: a multilingual marketplace (slmarket.lk) and SLMarket Flow, a real-time POS/ERP. | صممت وبنيت وأطلقت منتجين بمفردي: سوق إلكتروني متعدد اللغات (slmarket.lk) ونظام SLMarket Flow لنقاط البيع وإدارة الموارد في الوقت الفعلي. |
| `experience.items.slmarket.bullets.1` | Automated releases with GitHub Actions CI/CD, applied TDD with unit and integration tests, and added role-based authorisation and Redis caching. | أتمتت عمليات الإطلاق عبر GitHub Actions CI/CD، وطبقت منهج TDD باختبارات الوحدة والتكامل، وأضفت صلاحيات قائمة على الأدوار وتخزيناً مؤقتاً عبر Redis. |
| `experience.items.softsora.role` | Software Engineer | مهندس برمجيات |
| `experience.items.softsora.bullets.0` | Implemented Stripe billing (subscriptions, one-time payments, automated proration, webhooks and refunds), processing 200+ transactions across 10+ products. | نفذت نظام فوترة عبر Stripe يشمل الاشتراكات والدفعات لمرة واحدة والاحتساب التناسبي التلقائي وWebhooks واسترداد المبالغ. عالج النظام أكثر من 200 معاملة عبر أكثر من 10 منتجات. |
| `experience.items.softsora.bullets.1` | Built and deployed Node.js, Express.js and MongoDB services for Next.js and TypeScript frontends, with Jest unit and integration tests covering payment and API logic. | بنيت وأطلقت خدمات Node.js وExpress.js وMongoDB لواجهات Next.js وTypeScript، مع اختبارات وحدة وتكامل عبر Jest تغطي منطق الدفع وواجهات API. |
| `experience.items.softsoraAssociate.role` | Associate Software Engineer | مهندس برمجيات مساعد |
| `experience.items.softsoraAssociate.bullets.0` | Launched AI chatbot solutions for a leading oven company by integrating DIFY.ai workflows with custom Next.js interfaces. | أطلقت حلول روبوتات دردشة بالذكاء الاصطناعي لشركة رائدة في صناعة الأفران، عبر ربط مسارات DIFY.ai بواجهات Next.js مخصصة. |
| `experience.items.softsoraAssociate.bullets.1` | Automated customer interactions with a WhatsApp AI chatbot built with Python, LLM APIs and Twilio. | أتمتت التواصل مع العملاء عبر روبوت دردشة على WhatsApp بنيته باستخدام Python وLLM APIs وTwilio. |
| `experience.items.freelance.role` | Freelance Software Developer | مطور برمجيات مستقل |
| `experience.items.freelance.bullets.0` | Delivered client web applications end-to-end, from requirements to deployment, using React, Node.js, Express.js and Spring Boot. | نفذت تطبيقات ويب للعملاء من تحديد المتطلبات حتى النشر، باستخدام React وNode.js وExpress.js وSpring Boot. |
| `experience.items.freelance.bullets.1` | Built a sales counting and analysis tool that replaced a client's manual process. | بنيت أداة لإحصاء المبيعات وتحليلها حلت محل عملية يدوية لدى أحد العملاء. |
| `experience.items.elzian.role` | Software Engineer Intern | متدرب هندسة برمجيات |
| `experience.items.elzian.bullets.0` | Built full-stack features with the MERN stack for enterprise applications. | بنيت ميزات Full-Stack باستخدام MERN stack لتطبيقات المؤسسات. |
| `experience.items.elzian.bullets.1` | Implemented REST APIs and database operations across the SDLC, from requirements to testing. | نفذت REST APIs وعمليات قواعد البيانات عبر مراحل SDLC، من المتطلبات حتى الاختبار. |
| `teaching.items.solitrium.detail` | Teaching full-stack development, OOP, system design, SDLC and Git. Guided 20+ BIT final-year projects through code review. | أدرّس تطوير Full-Stack وOOP وتصميم الأنظمة وSDLC وGit. أرشدت أكثر من 20 مشروع تخرج في برنامج BIT عبر مراجعة الكود. |
| `teaching.items.earth.detail` | Taught Web Development, UX Design, Programming, OOP, system design, SDLC and Mathematics, and led Java and web lab sessions. | درّست تطوير الويب وتصميم تجربة المستخدم والبرمجة وOOP وتصميم الأنظمة وSDLC والرياضيات، وقدت جلسات مختبر في Java والويب. |
| `about.paragraph1` | I like owning a product from the first sketch to the system people use every day: shaping the data model, designing the API, building the interface, wiring payments and shipping it behind CI/CD. | أحب أن أتولى المنتج من أول رسم حتى يصبح نظاماً يستخدمه الناس كل يوم: أصمم نموذج البيانات وواجهة API، وأبني الواجهة، وأربط المدفوعات، وأطلقه عبر CI/CD. |
| `about.paragraph2` | At Softsora I built SaaS platforms, Stripe billing and LLM-powered features. On my own I designed, built and launched SLMarket and SLMarket Flow. I also teach: I founded {academy} and have guided 20+ final-year projects through code review. | في Softsora بنيت منصات SaaS وأنظمة فوترة عبر Stripe وميزات تعتمد على LLM. وبمفردي صممت وبنيت وأطلقت SLMarket وSLMarket Flow. وأعمل أيضاً في التدريس: أسست {academy} وأرشدت أكثر من 20 مشروع تخرج عبر مراجعة الكود. |
| `about.paragraph3` | I use Claude Code, GitHub Copilot and Cursor for speed, and I own the architecture and review every change myself. | أستخدم Claude Code وGitHub Copilot وCursor لأعمل بسرعة أكبر، لكن البنية التقنية تبقى مسؤوليتي، وأراجع كل تغيير بنفسي. |
| `contact.replyNote` |  | لغتي العربية في مستوى أساسي، لذلك يكون ردي أسرع بالإنجليزية. |

### Case studies (also high risk)

Whole-page translations, to read against the English file with the same name in `src/content/projects/`:

- `src/content/projects/ar/slmarket.mdx`
- `src/content/projects/ar/ai-business-support-saas.mdx`
- `src/content/projects/ar/ai-cv-builder.mdx`
- `src/content/projects/ar/whatsapp-ai-order-bot.mdx`

## Medium risk: headlines, labels and project summaries

Visible and persuasive, but short and easy to fix.

| Key | English | Arabic |
| --- | --- | --- |
| `meta.title` | Arshed Ahmed \| Full-Stack Software Engineer in the UAE | أرشد أحمد \| مهندس برمجيات Full-Stack في دبي وأبوظبي وعجمان |
| `meta.ogImageAlt` | Arshed Ahmed, full-stack software engineer in the UAE | أرشد أحمد، مهندس برمجيات Full-Stack في الإمارات |
| `meta.profileName` | Arshed Ahmed \| Full-Stack Software Engineer | أرشد أحمد، مهندس برمجيات Full-Stack |
| `common.jobTitle` | Full-Stack Software Engineer | مهندس برمجيات Full-Stack |
| `common.status` | Available immediately · UAE | متاح للانضمام فوراً · الإمارات |
| `common.locationLine` | Based in the UAE · Open to roles in Dubai, Abu Dhabi and Ajman | مقيم في الإمارات · أبحث عن فرص في دبي وأبوظبي وعجمان |
| `hero.imageAlt` | Arshed Ahmed, full-stack software engineer, in a sage suit jacket and white shirt | أرشد أحمد، مهندس برمجيات Full-Stack، يرتدي سترة خضراء فاتحة وقميصاً أبيض |
| `hero.coreStackAria` | Core stack | التقنيات الأساسية |
| `hero.viewWork` | View work | عرض الأعمال |
| `stats.aria` | Highlights | أبرز الأرقام |
| `stats.years` | Years experience | سنوات من الخبرة |
| `stats.saas` | SaaS products | منتجات SaaS |
| `stats.stripe` | Billing in production | نظام دفع يعمل فعلياً |
| `stats.solo` | Products launched solo | منتجات أطلقتها بمفردي |
| `work.eyebrow` | Selected work | أبرز الأعمال |
| `work.title` | Products I have built and shipped | منتجات بنيتها وأطلقتها |
| `work.description` | Featured projects across marketplaces, payments and AI. | مشاريع مختارة في الأسواق الإلكترونية وأنظمة الدفع والذكاء الاصطناعي. |
| `work.tagsAria` | Tags | التصنيفات |
| `work.readCaseStudy` | Read case study | قراءة دراسة الحالة |
| `work.badges.live` | Live | يعمل الآن |
| `work.badges.soloBuilt` | Solo-built | بنيته بمفردي |
| `projects.slmarket.titleAccent` | Ecosystem | منظومة متكاملة |
| `projects.slmarket.subtitle` | Marketplace + SLMarket Flow POS/ERP | سوق إلكتروني ونظام SLMarket Flow لنقاط البيع وإدارة الموارد |
| `projects.slmarket.summary` | A multilingual marketplace connecting buyers and sellers across Sri Lanka, plus SLMarket Flow, a real-time POS with ERP features. Designed, built and launched solo. | سوق إلكتروني متعدد اللغات يربط المشترين والبائعين في أنحاء سريلانكا، إلى جانب SLMarket Flow، وهو نظام نقاط بيع يعمل في الوقت الفعلي مع مزايا ERP. صممته وبنيته وأطلقته بمفردي. |
| `projects.slmarket.seoTitle` | SLMarket: Marketplace and POS/ERP Built Solo | SLMarket: سوق إلكتروني ونظام POS/ERP متكامل |
| `projects.slmarket.seoDescription` | How Arshed Ahmed designed, built and launched SLMarket solo: a multilingual Sri Lankan marketplace on Next.js and SLMarket Flow, a real-time Laravel POS/ERP. | كيف صمم أرشد أحمد SLMarket وبناه وأطلقه بمفرده: سوق إلكتروني سريلانكي متعدد اللغات على Next.js، ونظام SLMarket Flow لنقاط البيع على Laravel. |
| `projects.slmarket.outcome` | Two products designed, built and launched solo: a marketplace and a real-time POS/ERP. | منتجان صممتهما وبنيتهما وأطلقتهما بمفردي: سوق إلكتروني ونظام POS/ERP يعمل في الوقت الفعلي. |
| `projects.slmarket.tag` | E-commerce | التجارة الإلكترونية |
| `projects.slmarket.role` | Solo: product, architecture, full-stack development and deployment | بمفردي: المنتج والبنية التقنية والتطوير الكامل والنشر |
| `projects.ai-business-support-saas.title` | AI Business Support | منصة دعم الأعمال |
| `projects.ai-business-support-saas.titleAccent` | SaaS | بالذكاء الاصطناعي |
| `projects.ai-business-support-saas.subtitle` | Stripe payments layer and live payments dashboard | طبقة مدفوعات Stripe ولوحة مدفوعات مباشرة |
| `projects.ai-business-support-saas.summary` | A production SaaS platform of AI chatbots that guide businesses on grants and funding. I owned the Stripe payments layer end-to-end and built a real-time payments dashboard. | منصة SaaS تعمل فعلياً، وتضم روبوتات دردشة بالذكاء الاصطناعي ترشد الشركات إلى المنح والتمويل. توليت طبقة مدفوعات Stripe بالكامل، وبنيت لوحة مدفوعات تعمل في الوقت الفعلي. |
| `projects.ai-business-support-saas.seoTitle` | Stripe Payments for an AI Business SaaS | مدفوعات Stripe لمنصة SaaS بالذكاء الاصطناعي |
| `projects.ai-business-support-saas.seoDescription` | Arshed Ahmed owned the Stripe payments layer of a production AI SaaS that guides businesses on grants and funding, and built a real-time payments dashboard. | تولى أرشد أحمد طبقة مدفوعات Stripe في منصة SaaS بالذكاء الاصطناعي ترشد الشركات إلى المنح والتمويل، وبنى لوحة مدفوعات تعمل في الوقت الفعلي. |
| `projects.ai-business-support-saas.outcome` | Owned the Stripe payments layer end-to-end and built a real-time payments dashboard. | توليت طبقة مدفوعات Stripe بالكامل وبنيت لوحة مدفوعات تعمل في الوقت الفعلي. |
| `projects.ai-business-support-saas.tag` | SaaS · Payments | SaaS · المدفوعات |
| `projects.ai-business-support-saas.role` | Full-stack engineer; owner of the Stripe payments layer | مهندس Full-Stack ومسؤول عن طبقة مدفوعات Stripe |
| `projects.ai-cv-builder.title` | AI CV Builder | منشئ السيرة الذاتية |
| `projects.ai-cv-builder.titleAccent` | & Interview Prep | والتدريب على المقابلات |
| `projects.ai-cv-builder.subtitle` | ATS resume generation + voice mock interview | سير ذاتية متوافقة مع ATS ومقابلات تجريبية صوتية |
| `projects.ai-cv-builder.summary` | ATS-friendly resume generation, parsing and job-description optimisation, plus a voice-based AI mock interview that gives candidates instant feedback. | إنشاء سير ذاتية متوافقة مع أنظمة ATS وتحليلها وتحسينها وفق الوصف الوظيفي، إلى جانب مقابلة تجريبية صوتية بالذكاء الاصطناعي تقدم للمرشحين ملاحظات فورية. |
| `projects.ai-cv-builder.seoTitle` | AI CV Builder with Voice Mock Interviews | منشئ سير ذاتية بالذكاء الاصطناعي ومقابلات صوتية |
| `projects.ai-cv-builder.seoDescription` | An AI CV builder by Arshed Ahmed: ATS-friendly resumes tailored to a job description, plus voice mock interviews with instant AI feedback, on Next.js and Groq. | منشئ سير ذاتية بالذكاء الاصطناعي من أرشد أحمد: سير متوافقة مع ATS ومكيّفة حسب الوصف الوظيفي، ومقابلات تجريبية صوتية بملاحظات فورية، على Next.js وGroq. |
| `projects.ai-cv-builder.outcome` | ATS-friendly resumes and voice mock interviews with instant AI feedback. | سير ذاتية متوافقة مع ATS ومقابلات تجريبية صوتية بملاحظات فورية من الذكاء الاصطناعي. |
| `projects.ai-cv-builder.tag` | AI / LLM | الذكاء الاصطناعي / LLM |
| `projects.ai-cv-builder.role` | Full-stack development | تطوير Full-Stack |
| `projects.whatsapp-ai-order-bot.title` | WhatsApp AI | بوت WhatsApp |
| `projects.whatsapp-ai-order-bot.titleAccent` | Order Bot | للطلبات بالذكاء الاصطناعي |
| `projects.whatsapp-ai-order-bot.subtitle` | Conversational ordering and support on WhatsApp | طلبات ودعم عبر المحادثة على WhatsApp |
| `projects.whatsapp-ai-order-bot.summary` | A WhatsApp AI chatbot built with Python, LLM APIs and Twilio that automates customer conversations. | روبوت دردشة على WhatsApp يعمل بالذكاء الاصطناعي، بنيته باستخدام Python وLLM APIs وTwilio، ويؤتمت محادثات العملاء. |
| `projects.whatsapp-ai-order-bot.seoTitle` | WhatsApp AI Bot That Automates Customer Chats | بوت WhatsApp بالذكاء الاصطناعي لمحادثات العملاء |
| `projects.whatsapp-ai-order-bot.seoDescription` | A WhatsApp AI chatbot Arshed Ahmed built and deployed at Softsora with Python, LLM APIs and Twilio, automating customer conversations on WhatsApp. | روبوت دردشة على WhatsApp بناه أرشد أحمد وأطلقه في Softsora باستخدام Python وLLM APIs وTwilio، ويؤتمت محادثات العملاء على WhatsApp. |
| `projects.whatsapp-ai-order-bot.outcome` | Automated customer conversations on WhatsApp with an LLM-powered bot. | أتمتة محادثات العملاء على WhatsApp عبر بوت يعمل بنماذج LLM. |
| `projects.whatsapp-ai-order-bot.tag` | Automation | الأتمتة |
| `projects.whatsapp-ai-order-bot.role` | Developer: built and deployed the bot | مطور: بناء البوت وإطلاقه |
| `experience.eyebrow` | Experience | الخبرات |
| `experience.title` | Where I have worked | أين عملت |
| `experience.present` | Present | حتى الآن |
| `experience.selfEmployed` | Self-employed | عمل حر |
| `skills.eyebrow` | Skills | المهارات |
| `skills.title` | Technologies I work with | التقنيات التي أعمل بها |
| `skills.groups.frontend` | Frontend | الواجهة الأمامية |
| `skills.groups.backend` | Backend and Data | الواجهة الخلفية والبيانات |
| `skills.groups.ai` | AI and Integrations | الذكاء الاصطناعي والتكاملات |
| `skills.groups.devops` | DevOps and Testing | DevOps والاختبارات |
| `skills.items.restApi` | REST API design | تصميم REST API |
| `skills.items.stripe` | Stripe (subscriptions, proration, webhooks, refunds) | الدفع عبر Stripe (الاشتراكات، الاحتساب التناسبي، Webhooks، الاسترداد) |
| `teaching.eyebrow` | Teaching | التدريس |
| `teaching.title` | Teaching and mentoring | التدريس والإرشاد |
| `teaching.present` | Present | حتى الآن |
| `teaching.items.solitrium.role` | Course Instructor & Founder | مدرّب ومؤسس |
| `teaching.items.earth.role` | Junior Lecturer / Demonstrator (Part-time) | محاضر مساعد ومشرف مختبرات (دوام جزئي) |
| `about.eyebrow` | About | نبذة عني |
| `about.title` | From idea to live system | من الفكرة إلى نظام يعمل |
| `about.portraitAlt` | Head-and-shoulders portrait of Arshed Ahmed | صورة شخصية لأرشد أحمد |
| `about.quickFactsAria` | Quick facts | معلومات سريعة |
| `about.nationality` | Sri Lankan | سريلانكي الجنسية |
| `about.basedIn` | Based in UAE | مقيم في الإمارات |
| `about.availableNow` | Available now | متاح الآن |
| `about.credentialsTitle` | Education and certifications | التعليم والشهادات |
| `about.education` | Education | التعليم |
| `about.certifications` | Certifications | الشهادات |
| `about.degrees.bit.degree` | Bachelor of Information Technology (BIT) | بكالوريوس تقنية المعلومات (BIT) |
| `about.degrees.bit.school` | University of Colombo School of Computing (UCSC) | كلية الحاسوب بجامعة كولومبو (UCSC) |
| `about.degrees.bsc.degree` | BSc in Physical Science | بكالوريوس العلوم الفيزيائية |
| `about.degrees.bsc.school` | University of Colombo | جامعة كولومبو |
| `about.certs.ethicalHacker` | Cisco Ethical Hacker | Ethical Hacker من Cisco |
| `about.certs.securityFundamentals` | Palo Alto Networks Security Fundamentals | Security Fundamentals من Palo Alto Networks |
| `about.certs.jenkinsDocker` | Jenkins and Docker | Jenkins وDocker |
| `about.languagesLabel` | Languages: | اللغات: |
| `about.languagesList` | English (professional), Sinhala (native), Tamil (native), Arabic (basic) | الإنجليزية (مستوى مهني)، السنهالية (اللغة الأم)، التاميلية (اللغة الأم)، العربية (مستوى أساسي) |
| `contact.eyebrow` | Contact | التواصل |
| `contact.title` | Get in touch | تواصل معي |
| `contact.description` | Hiring for a full-stack role, or have a product to build? Send a message or reach me directly. | تبحث عن مطور ويب أو مهندس Full-Stack، أو لديك منتج تريد بناءه؟ أرسل لي رسالة أو تواصل معي مباشرة. |
| `contact.noticeLabel` | Notice period: | فترة الإشعار: |
| `contact.noticeValue` | Immediate | فوراً |

## Low risk: interface text

Buttons, form messages, screen-reader labels and diagram labels. A quick read is enough. The diagram labels must stay short
to fit their boxes.

| Key | English | Arabic |
| --- | --- | --- |
| `common.name` | Arshed Ahmed | أرشد أحمد |
| `common.firstName` | Arshed | أرشد |
| `common.lastName` | Ahmed | أحمد |
| `common.skipToContent` | Skip to content | الانتقال إلى المحتوى |
| `common.logoHome` | {name}, home | {name}، الصفحة الرئيسية |
| `common.toggleThemeLabel` | Toggle light and dark theme | التبديل بين الوضعين الفاتح والداكن |
| `common.toggleThemeTitle` | Toggle theme | تغيير المظهر |
| `common.copied` | Copied to clipboard | تم النسخ |
| `common.downloadCv` | Download CV | تحميل السيرة الذاتية |
| `common.cvShortSuffix` |  (download PDF) |  (تحميل السيرة الذاتية بصيغة PDF) |
| `common.externalLabel` | {label} (opens in a new tab) | {label} (يفتح في علامة تبويب جديدة) |
| `common.channels.email` | Email | البريد الإلكتروني |
| `nav.home` | Home | الرئيسية |
| `nav.work` | Work | أعمالي |
| `nav.experience` | Experience | الخبرات |
| `nav.skills` | Skills | المهارات |
| `nav.about` | About | نبذة عني |
| `nav.contact` | Contact | تواصل معي |
| `nav.primaryAria` | Primary | القائمة الرئيسية |
| `nav.footerAria` | Footer | روابط أسفل الصفحة |
| `nav.mobileAria` | Mobile | قائمة الهاتف |
| `nav.sectionsAria` | Sections | أقسام الصفحة |
| `nav.openMenu` | Open menu | فتح القائمة |
| `nav.closeMenu` | Close menu | إغلاق القائمة |
| `projects.slmarket.coverAlt` | SLMarket marketplace home page with product listings | الصفحة الرئيسية لسوق SLMarket الإلكتروني مع قوائم المنتجات |
| `projects.slmarket.screenshotAlts.marketplace-home` | SLMarket marketplace home page with categories and product listings | الصفحة الرئيسية لسوق SLMarket مع الفئات وقوائم المنتجات |
| `projects.slmarket.screenshotAlts.flow-pos` | SLMarket Flow point-of-sale screen with a cart and product grid | شاشة نقطة البيع في SLMarket Flow مع سلة وشبكة منتجات |
| `projects.slmarket.screenshotAlts.marketplace-mobile` | SLMarket marketplace on a phone | سوق SLMarket على الهاتف |
| `projects.slmarket.stackLabels.marketplace` | Marketplace | السوق الإلكتروني |
| `projects.slmarket.architecture.rows.users` | Users | المستخدمون |
| `projects.slmarket.architecture.rows.apps` | Apps | التطبيقات |
| `projects.slmarket.architecture.rows.data` | Data | البيانات |
| `projects.slmarket.architecture.rows.delivery` | Delivery | النشر |
| `projects.slmarket.architecture.nodes.buyers.title` | Buyers | المشترون |
| `projects.slmarket.architecture.nodes.buyers.sub` | Web, multilingual | الويب، عدة لغات |
| `projects.slmarket.architecture.nodes.sellers.title` | Sellers | البائعون |
| `projects.slmarket.architecture.nodes.sellers.sub` | Web | الويب |
| `projects.slmarket.architecture.nodes.staff.title` | Shop staff | موظفو المتجر |
| `projects.slmarket.architecture.nodes.staff.sub` | POS | نقطة البيع |
| `projects.slmarket.architecture.nodes.market.title` | Marketplace | السوق الإلكتروني |
| `projects.slmarket.architecture.nodes.redis.sub` | Cache | التخزين المؤقت |
| `projects.slmarket.architecture.nodes.cdn.sub` | Media | الوسائط |
| `projects.slmarket.architecture.nodes.mysql.sub` | POS data | بيانات البيع |
| `projects.ai-business-support-saas.coverAlt` | AI Business Support SaaS payments dashboard | لوحة المدفوعات في منصة دعم الأعمال بالذكاء الاصطناعي |
| `projects.ai-business-support-saas.screenshotAlts.payments-dashboard` | Real-time Stripe payments dashboard with transaction list | لوحة مدفوعات Stripe في الوقت الفعلي مع قائمة بالمعاملات |
| `projects.ai-business-support-saas.screenshotAlts.chatbot` | AI chatbot conversation guiding a business on grants and funding | محادثة مع روبوت دردشة يرشد شركة إلى المنح والتمويل |
| `projects.ai-business-support-saas.stackLabels.platform` | Platform | المنصة |
| `projects.ai-business-support-saas.architecture.rows.users` | Users | المستخدمون |
| `projects.ai-business-support-saas.architecture.rows.frontend` | Frontend | الواجهة الأمامية |
| `projects.ai-business-support-saas.architecture.rows.backend` | Backend | الواجهة الخلفية |
| `projects.ai-business-support-saas.architecture.rows.services` | Services | الخدمات |
| `projects.ai-business-support-saas.architecture.nodes.biz.title` | Businesses | الشركات |
| `projects.ai-business-support-saas.architecture.nodes.biz.sub` | Chat + billing | الدردشة والفوترة |
| `projects.ai-business-support-saas.architecture.nodes.team.title` | Internal team | الفريق الداخلي |
| `projects.ai-business-support-saas.architecture.nodes.team.sub` | Dashboard | لوحة التحكم |
| `projects.ai-business-support-saas.architecture.nodes.web.title` | Next.js app | تطبيق Next.js |
| `projects.ai-business-support-saas.architecture.nodes.api.sub` | Payments + business logic | المدفوعات ومنطق العمل |
| `projects.ai-business-support-saas.architecture.nodes.ai.title` | AI chatbots | روبوتات الدردشة |
| `projects.ai-business-support-saas.architecture.nodes.ai.sub` | LLM workflows | مسارات LLM |
| `projects.ai-business-support-saas.architecture.nodes.stripe.sub` | Billing + webhooks | الفوترة وWebhooks |
| `projects.ai-business-support-saas.architecture.nodes.db.title` | Database | قاعدة البيانات |
| `projects.ai-business-support-saas.architecture.nodes.db.sub` | Payment records | سجلات الدفع |
| `projects.ai-cv-builder.coverAlt` | AI CV Builder resume editor | محرر السيرة الذاتية في منشئ السير الذاتية |
| `projects.ai-cv-builder.screenshotAlts.resume-editor` | Resume editor with an ATS-optimised CV preview | محرر السيرة الذاتية مع معاينة لسيرة محسّنة لأنظمة ATS |
| `projects.ai-cv-builder.screenshotAlts.mock-interview` | Voice mock interview screen with AI feedback | شاشة المقابلة التجريبية الصوتية مع ملاحظات الذكاء الاصطناعي |
| `projects.ai-cv-builder.stackLabels.platform` | Platform | المنصة |
| `projects.ai-cv-builder.architecture.rows.users` | Users | المستخدمون |
| `projects.ai-cv-builder.architecture.rows.app` | App | التطبيق |
| `projects.ai-cv-builder.architecture.rows.aiData` | AI + Data | الذكاء الاصطناعي والبيانات |
| `projects.ai-cv-builder.architecture.nodes.cand.title` | Candidates | المرشحون |
| `projects.ai-cv-builder.architecture.nodes.cand.sub` | Web + microphone | الويب والميكروفون |
| `projects.ai-cv-builder.architecture.nodes.next.title` | Next.js app | تطبيق Next.js |
| `projects.ai-cv-builder.architecture.nodes.groq.sub` | Resume + feedback | السيرة والملاحظات |
| `projects.ai-cv-builder.architecture.nodes.whisper.sub` | Speech-to-text | تحويل الكلام إلى نص |
| `projects.whatsapp-ai-order-bot.coverAlt` | WhatsApp AI order bot conversation | محادثة مع بوت الطلبات على WhatsApp |
| `projects.whatsapp-ai-order-bot.screenshotAlts.chat-1` | WhatsApp conversation in which the bot answers a customer question | محادثة على WhatsApp يجيب فيها البوت عن سؤال أحد العملاء |
| `projects.whatsapp-ai-order-bot.screenshotAlts.chat-2` | Order confirmation message sent by the bot in WhatsApp | رسالة تأكيد طلب أرسلها البوت على WhatsApp |
| `projects.whatsapp-ai-order-bot.stackLabels.bot` | Bot | البوت |
| `projects.whatsapp-ai-order-bot.architecture.rows.users` | Users | المستخدمون |
| `projects.whatsapp-ai-order-bot.architecture.rows.channel` | Channel | القناة |
| `projects.whatsapp-ai-order-bot.architecture.rows.service` | Service | الخدمة |
| `projects.whatsapp-ai-order-bot.architecture.rows.ai` | AI | الذكاء الاصطناعي |
| `projects.whatsapp-ai-order-bot.architecture.nodes.cust.title` | Customers | العملاء |
| `projects.whatsapp-ai-order-bot.architecture.nodes.py.title` | Python service | خدمة Python |
| `projects.whatsapp-ai-order-bot.architecture.nodes.py.sub` | Webhook + logic | Webhook ومنطق العمل |
| `projects.whatsapp-ai-order-bot.architecture.nodes.llm.sub` | Intent + replies | فهم الرسائل والردود |
| `caseStudy.breadcrumbAria` | Breadcrumb | مسار التنقل |
| `caseStudy.home` | Home | الرئيسية |
| `caseStudy.breadcrumbHome` | Home | الرئيسية |
| `caseStudy.screenshots` | Screenshots | لقطات الشاشة |
| `caseStudy.moreProjectsAria` | More projects | مشاريع أخرى |
| `caseStudy.allProjects` | All projects | كل المشاريع |
| `caseStudy.next` | Next: {title} | التالي: {title} |
| `caseStudy.stackAria` | {label} stack | تقنيات {label} |
| `caseStudy.architectureTitle` | {title} system architecture | البنية التقنية: {title} |
| `caseStudy.architectureEdge` | {from} connects to {to} | {from} يتصل بـ {to} |
| `caseStudy.noPublicLink` | This project has no public link. I am happy to walk through it in an interview. | لا يتوفر رابط عام لهذا المشروع. يسعدني أن أشرحه لكم بالتفصيل في المقابلة. |
| `caseStudy.opensNewTab` |  (opens in a new tab) |  (يفتح في علامة تبويب جديدة) |
| `caseStudy.ogImageAlt` | {title} case study by {name}: {subtitle} | دراسة حالة {title} من {name}: {subtitle} |
| `caseStudy.ogEyebrow` | Case study | دراسة حالة |
| `contact.visaLabel` | Visa status: | حالة التأشيرة: |
| `contact.copyEmail` | Copy email address | نسخ البريد الإلكتروني |
| `contact.form.title` | Send a message | أرسل رسالة |
| `contact.form.name` | Name | الاسم |
| `contact.form.email` | Email | البريد الإلكتروني |
| `contact.form.message` | Message | الرسالة |
| `contact.form.messagePlaceholder` | A role, a project or a question | فرصة عمل أو مشروع أو سؤال |
| `contact.form.send` | Send message | إرسال الرسالة |
| `contact.form.sending` | Sending… | جارٍ الإرسال… |
| `contact.form.successTitle` | Thanks, your message is on its way. | شكراً لك، رسالتك في طريقها إلي. |
| `contact.form.successBody` | I'll get back to you at the email address you gave. | سأرد عليك على البريد الإلكتروني الذي أدخلته. |
| `contact.form.sendAnother` | Send another message | إرسال رسالة أخرى |
| `contact.form.failed` | Your message didn't send. Please try again, or email me directly at <email></email>. | لم تُرسل رسالتك. حاول مرة أخرى، أو راسلني مباشرة على <email></email>. |
| `contact.form.errors.nameMin` | Enter your name (at least 2 characters). | أدخل اسمك (حرفان على الأقل). |
| `contact.form.errors.nameMax` | Keep your name under 80 characters. | يجب ألا يتجاوز الاسم 80 حرفاً. |
| `contact.form.errors.emailInvalid` | Enter a valid email address, like name@company.com. | أدخل بريداً إلكترونياً صحيحاً، مثل name@company.com. |
| `contact.form.errors.messageMin` | Add a few more details (at least 10 characters). | أضف مزيداً من التفاصيل (10 أحرف على الأقل). |
| `contact.form.errors.messageMax` | Keep your message under 2000 characters. | يجب ألا تتجاوز الرسالة 2000 حرف. |
| `footer.rights` | © {year} {name}. All rights reserved. | © {year} {name}. جميع الحقوق محفوظة. |
| `notFound.metaTitle` | Page not found | الصفحة غير موجودة |
| `notFound.title` | This page doesn't exist | هذه الصفحة غير موجودة |
| `notFound.description` | The link may be out of date. The projects and contact details are all on the home page. | قد يكون الرابط قديماً. ستجد المشاريع وبيانات التواصل كلها في الصفحة الرئيسية. |
| `notFound.goHome` | Go to home page | العودة إلى الصفحة الرئيسية |
| `notFound.viewProjects` | View projects | عرض المشاريع |
