class Api::V2::WinesController < ApplicationController
  before_action :set_wine, only: [:show, :edit, :update, :destroy]

  # GET /wines
  # GET /wines.json
  def index
    @wines = Wine.all.order(brand: :asc)
    render json: @wines
  end

  # GET /wines/1
  # GET /wines/1.json
  def show
    if @wine
      render json: @wine
    else
      render json: @wine.errors
    end
  end

  # GET /wines/new
  def new
    @wine = Wine.new
  end

  # GET /wines/1/edit
  def edit
  end

  # POST /wines
  # POST /wines.json
  def create
    @wine = Wine.new(wine_params)


    if @wine.save
      render json: @wine
    else
      render json: @wine.errors
    end
  end

  # PATCH/PUT /wines/1
  # PATCH/PUT /wines/1.json
  def update
  end

  # DELETE /wines/1
  # DELETE /wines/1.json
  def destroy
    @wine.destroy

    render json: { notice: 'Wine was successfully removed.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_wine
      @wine = Wine.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def wine_params
      params.permit(:brand, :style, :country, :quantity)
    end
end
