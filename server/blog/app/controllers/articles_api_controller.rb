class ArticlesApiController < ApplicationController
  before_action :set_article, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token 
  # GET /articles
  # GET /articles.json
  
  def index
    @articles = Article.all
    render json: @articles
  end

  # GET /articles/1
  # GET /articles/1.json
  def show
  	render json: Article.find(params[:id])
  end

  # GET /articles/new
  def new
    @article = Article.new
  end

  # GET /articles/1/edit
  def edit
  end

  # POST /articles
  # POST /articles.json
  def create

    @article = Article.new(article_params)

      if @article.save

      	@status = Hash.new("status")
      	@status["status"] = "created"
        render json: @status
      else
        render json: @article.errors
      end
  end

  # PATCH/PUT /articles/1
  # PATCH/PUT /articles/1.json
  def update
      if @article.update(article_params)
        render json: @article
      else
        render json: @article.errors
      end
    
  end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article.destroy

    @status = Hash.new("status")
    @status["status"] = "deleted"
    render json: @status
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_article
      @article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def article_params
      params.require(:article).permit(:title, :text)
    end
end
