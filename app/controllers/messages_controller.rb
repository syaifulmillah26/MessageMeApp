class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /messages or /messages.json
  def index
    @friends = Friend.where(user_id: current_user.id).order(created_at: :desc)
    # fresh_when etag: @friends
    expires_in 2.minutes
    fresh_when @friends, public: true
    @message = Message.new
  end

  def get_user
    users = User.find_by(id: params[:user_id])
    room  = Room.find_by(name: "#{users.username} and #{current_user.username}")&.id
    room_2 = Room.find_by(name: "#{current_user.username} and #{users.username}")&.id
    if !room.present?
      if !room_2.present?
        room_id = nil
        render json:{
          user_id: users.id.as_json, 
          name: users.name.as_json, 
          message: "no room id"}, status: 200
      else
        room_id = room_2
        messages  = Message.where(room_id: room_2)
        render json: { 
          # date: created_at.strftime("at %I:%M%p"),
          rooms: messages,
          room_id: room_id.as_json, 
          user_id: users.id.as_json, 
          name: users.name.as_json},
          status: 200 
      end
    else
      room_id = room
      messages  = Message.where(room_id: room)
      render json: { 
        # date: created_at.strftime("at %I:%M%p"),
        rooms: messages,
        room_id: room_id.as_json, 
        user_id: users.id.as_json, 
        name: users.name.as_json},
        status: 200 
    end
  end

  # GET /messages/1 or /messages/1.json
  def show
  end

  # GET /messages/new
  def new
    @message = Message.new
  end

  # GET /messages/1/edit
  def edit
  end

  # POST /messages or /messages.json
  def create_message
    users   = message_params[:user_id]
    room    = message_params[:room_id]
    message = message_params[:body]
    user    = User.find_by(id: users)
    rooms   = Room.find_by(id: room)
    if !rooms.present?
      Room.create(name: "#{current_user.username} and #{user&.username}")
      Message.create(user_id: current_user.id, sender: current_user.name, room_id: Room.last&.id, body: message, date: Time.now.strftime("at %I:%M %p"))
      flash[:notice] = "Saved ..."   #there you are!!!
      ActionCable.server.broadcast 'chatroom_channel',
                                            content: Message.last
      # render json: {
      #   user_id: Message.last&.user_id.as_json, 
      #   room_id: Message.last&.room_id.as_json,
      #   sender: Message.last&.sender.as_json,
      #   body: Message.last&.body.as_json , 
      #   message: "Room Has been created"}, 
      #   status: 200
    else
      Message.create(user_id: current_user.id, sender: current_user.name, room_id: room, body: message, date: Time.now.strftime("at %I:%M %p"))
      ActionCable.server.broadcast 'chatroom_channel',
                                            content: Message.last
      # render json: {
      #   user_id: Message.last&.user_id.as_json, 
      #   room_id: Message.last&.room_id.as_json,
      #   sender: Message.last&.sender.as_json,
      #   body: Message.last&.body.as_json , 
      #   message: "Message successfully created"},
      #   status: 200
    end
  end

  # PATCH/PUT /messages/1 or /messages/1.json
  def update
    respond_to do |format|
      if @message.update(message_params)
        format.html { redirect_to @message, notice: "Message was successfully updated." }
        format.json { render :show, status: :ok, location: @message }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1 or /messages/1.json
  def destroy
    @message.destroy
    respond_to do |format|
      format.html { redirect_to messages_url, notice: "Message was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body, :user_id, :room_id)
    end
end
