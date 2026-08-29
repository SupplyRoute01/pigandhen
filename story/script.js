const loadingState = document.querySelector('[data-loading]');
const article = document.querySelector('[data-article]');
const errorState = document.querySelector('[data-error]');
const errorMessage = document.querySelector('[data-error-message]');

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const renderInline = (value) => {
  const linkPattern = /\[([^\]]+)]\((https:\/\/[^)\s]+)\)/g;
  let rendered = '';
  let cursor = 0;
  let match = linkPattern.exec(value);

  while (match) {
    rendered += escapeHtml(value.slice(cursor, match.index));
    rendered += `<a href="${escapeHtml(match[2])}" target="_blank" rel="noopener noreferrer">${escapeHtml(match[1])}</a>`;
    cursor = match.index + match[0].length;
    match = linkPattern.exec(value);
  }

  return rendered + escapeHtml(value.slice(cursor));
};

const renderContent = (content) => content
  .split('\n\n')
  .filter(Boolean)
  .map((block) => {
    if (block.startsWith('## ')) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
    return `<p>${renderInline(block).replaceAll('\n', '<br>')}</p>`;
  })
  .join('');

const formatDate = (date) => new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(`${date}T00:00:00`));

const showError = (message) => {
  loadingState.hidden = true;
  article.hidden = true;
  errorMessage.textContent = message;
  errorState.hidden = false;
};

const renderStory = (post, posts) => {
  document.title = `${post.title} | 피그앤헨`;
  document.querySelector('meta[name="description"]').setAttribute('content', post.excerpt);
  document.querySelector('[data-title]').textContent = post.title;
  document.querySelector('[data-excerpt]').textContent = post.excerpt;
  document.querySelector('[data-author]').textContent = post.author;

  const publishedDate = document.querySelector('[data-date]');
  publishedDate.dateTime = post.publishedAt;
  publishedDate.textContent = formatDate(post.publishedAt);
  document.querySelector('[data-content]').innerHTML = renderContent(post.content);

  const faqList = document.querySelector('[data-faq]');
  post.faq.forEach(({ q, a }) => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    const question = document.createElement('dt');
    const answer = document.createElement('dd');
    question.textContent = q;
    answer.textContent = a;
    item.append(question, answer);
    faqList.append(item);
  });

  const relatedList = document.querySelector('[data-related]');
  posts.filter(({ slug }) => slug !== post.slug).forEach((relatedPost, index) => {
    const link = document.createElement('a');
    link.className = 'related-story';
    link.href = `?slug=${encodeURIComponent(relatedPost.slug)}`;
    const label = document.createElement('span');
    const title = document.createElement('strong');
    label.textContent = `0${index + 1} / JOURNAL`;
    title.textContent = relatedPost.title;
    link.append(label, title);
    relatedList.append(link);
  });

  loadingState.hidden = true;
  article.hidden = false;
};

const loadStory = async () => {
  const slug = new URLSearchParams(window.location.search).get('slug');
  if (!slug) {
    showError('읽을 글이 지정되지 않았습니다. 이야기 목록에서 글을 선택해 주세요.');
    return;
  }

  try {
    const response = await fetch('posts.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const { posts } = await response.json();
    const post = posts.find((item) => item.slug === slug);
    if (!post) {
      showError('해당 글을 찾을 수 없습니다. 이야기 목록에서 다른 글을 선택해 주세요.');
      return;
    }
    renderStory(post, posts);
  } catch (error) {
    showError('글을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
  }
};

document.querySelector('[data-year]').textContent = new Date().getFullYear();
loadStory();
