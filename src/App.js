import React,{useState,useEffect} from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';

const alanKey ="c43ea2fe911d7b5e44041204342b86702e956eca572e1d8b807a3e2338fdd0dc/stage"


function App() {

  const[newsArticles,setNewsArticles] = useState([])
  const[activeArticle,setActiveArticle] = useState(-1)
  const classes = useStyles();
  

  useEffect(()=>{
    alanBtn({
      key : alanKey,
      onCommand : ({command,articles,number})=>{
        if(command==='newsHeadlines'){
          
          setNewsArticles(articles)
          setActiveArticle(-1)

        } else if(command==='highlight' ){
          setActiveArticle((prevActiveArticle)=>
            prevActiveArticle + 1)
          }
          else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
          
        }
      })
  
    },[])
            
          



  return (
    <div className="App">
      <div className={classes.logoContainer}>
      <img src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2020/09/Futuristic-image-1-Copy.png?fit=3184%2C1878&ssl=1" className={classes.alanLogo} alt="logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
